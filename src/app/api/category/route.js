import connectDB from "../../../../config/connectDB";
import { Category } from "../../../../models/category";

// GET all categories, POST new category
export async function GET() {
	await connectDB();
	const categories = await Category.find().sort({ order_by: 1 });
	return Response.json(categories);
}

export async function POST(req) {
	await connectDB();
	const body = await req.json();
	const created = await Category.create(body);
	return Response.json(created);
}
