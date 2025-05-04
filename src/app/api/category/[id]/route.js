import connectDB from "../../../../../config/connectDB";
import { Category } from "../../../../../models/category";

// GET single category
export async function GET(_, { params }) {
	await connectDB();
	const category = await Category.findById(params.id);
	if (!category) return new Response("Not Found", { status: 404 });
	return Response.json(category);
}

// UPDATE category
export async function PUT(req, { params }) {
	await connectDB();
	const data = await req.json();
	const updated = await Category.findByIdAndUpdate(params.id, data, {
		new: true,
	});
	return Response.json(updated);
}

// DELETE category
export async function DELETE(_, { params }) {
	await connectDB();
	await Category.findByIdAndDelete(params.id);
	return Response.json({ success: true });
}
