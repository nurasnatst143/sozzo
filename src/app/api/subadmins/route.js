import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import User from "../../../../models/user.js";
import bcrypt from "bcryptjs";
import { authOptions } from "../auth/[...nextauth]/route.js";
import connectDB from "../../../../config/connectDB.js";

/**
 * POST /api/admin/subadmins
 * Body: { name: string, email: string, password: string }
 * Auth: Admin only
 */
export async function POST(req) {
	// 1) Auth: only admins can create sub-admins
	const session = await getServerSession(authOptions);
	if (!session || session.user?.role !== "admin") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	// 2) Parse & validate input
	let payload;
	try {
		payload = await req.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	const name = (payload?.name || "").trim();
	const email = (payload?.email || "").toLowerCase().trim();
	const password = payload?.password || "";
	const username = (payload?.username || "").trim();

	if (!name || !email || !password || !username) {
		return NextResponse.json(
			{ error: "Missing name, email, password, or username" },
			{ status: 400 }
		);
	}
	if (password.length < 6) {
		return NextResponse.json(
			{ error: "Password must be at least 6 characters" },
			{ status: 400 }
		);
	}

	// 3) Create user
	try {
		await connectDB();

		const exists = await User.findOne({ email });
		if (exists) {
			return NextResponse.json(
				{ error: "A user with this email already exists" },
				{ status: 409 }
			);
		}

		const hash = await bcrypt.hash(password, 12);

		const doc = await User.create({
			authProvider: "email",
			email,
			emailVerified: true, // or false if you plan to send verification
			password: hash,
			username,
			name,
			role: "subadmin",
			status: "active",
		});

		return NextResponse.json(
			{
				id: doc._id.toString(),
				name: doc.name,
				email: doc.email,
				role: doc.role,
				status: doc.status,
				createdAt: doc.createdAt,
			},
			{ status: 201 }
		);
	} catch (err) {
		console.error("Create sub-admin error:", err);
		return NextResponse.json(
			{ error: "Server error creating sub-admin" },
			{ status: 500 }
		);
	}
}

export async function PATCH(req, { params }) {
	const session = await getServerSession(authOptions);
	if (!session || session.user?.role !== "admin") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	await connectDB();

	const body = await req.json();
	const { name, email, username, status, image, password } = body ?? {};

	// Only allow editing subadmin accounts
	const user = await User.findOne({ _id: params.id, role: "subadmin" });
	if (!user)
		return NextResponse.json({ error: "Sub-admin not found" }, { status: 404 });

	if (name !== undefined) user.name = name;
	if (email !== undefined) user.email = email;
	if (username !== undefined) user.username = username;
	if (status !== undefined) user.status = status; // e.g., active | suspended | verified
	if (image !== undefined) user.image = image;

	if (password) {
		user.password = await bcrypt.hash(password, 10);
	}

	await user.save();

	return NextResponse.json({
		ok: true,
		user: {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			username: user.username,
			status: user.status,
			image: user.image,
			createdAt: user.createdAt,
		},
	});
}

export async function DELETE(_req, { params }) {
	const session = await getServerSession(authOptions);
	if (!session || session.user?.role !== "admin") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	await connectDB();

	// Prevent deleting yourself
	if (params.id === session.user.id) {
		return NextResponse.json(
			{ error: "You cannot delete your own account." },
			{ status: 400 }
		);
	}

	const user = await User.findOne({ _id: params.id, role: "subadmin" });
	if (!user)
		return NextResponse.json({ error: "Sub-admin not found" }, { status: 404 });

	await User.deleteOne({ _id: params.id });

	return NextResponse.json({ ok: true });
}
