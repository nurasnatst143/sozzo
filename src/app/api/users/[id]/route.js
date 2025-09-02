import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // or "@/lib/auth" if you use that

import User from "../../../../../models/user";
import connectDB from "../../../../../config/connectDB";

export const runtime = "nodejs";

// PATCH /api/admin/users/:id  { action: "block" | "unblock" | "delete" }
export async function PATCH(req, { params }) {
	const session = await getServerSession(authOptions);
	if (!session || session.user?.role !== "admin") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { id } = params;
	let body;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });
	}

	const action = body?.action;
	if (!["block", "unblock", "delete"].includes(action)) {
		return NextResponse.json({ error: "Invalid action" }, { status: 400 });
	}

	await connectDB();

	const target = await User.findById(id).select("_id role status");
	if (!target)
		return NextResponse.json({ error: "User not found" }, { status: 404 });

	// safety: don't act on admins or yourself
	if (target.role === "admin") {
		return NextResponse.json(
			{ error: "Cannot modify admins" },
			{ status: 403 }
		);
	}
	if (target._id.toString() === session.user.id) {
		return NextResponse.json(
			{ error: "You cannot modify yourself" },
			{ status: 400 }
		);
	}

	const nextStatus =
		action === "block"
			? "suspended"
			: action === "unblock"
			? "active"
			: "deleted";

	target.status = nextStatus;
	await target.save();

	return NextResponse.json({ ok: true, status: target.status });
}

// Optional HARD delete (permanent) — only if you really need it
export async function DELETE(req, { params }) {
	const session = await getServerSession(authOptions);
	if (!session || session.user?.role !== "admin") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	await connectDB();
	const user = await User.findById(params.id).select("_id role");
	if (!user)
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	if (user.role === "admin" || user._id.toString() === session.user.id) {
		return NextResponse.json({ error: "Not allowed" }, { status: 403 });
	}

	await User.deleteOne({ _id: user._id });
	return NextResponse.json({ ok: true });
}
