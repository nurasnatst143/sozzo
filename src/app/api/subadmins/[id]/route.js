import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import connectDB from "../../../../../config/connectDB.js";
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
