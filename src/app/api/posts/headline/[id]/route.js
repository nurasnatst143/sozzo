import connectDB from "../../../../../../config/connectDB";
import Post from "../../../../../../models/post";
import Headline from "../../../../../../models/headline";

export const GET = async (request, { params }) => {
	try {
		await connectDB();
		const lookupHeadline = await Headline.findOne({ post: params.id });

		if (!lookupHeadline) {
			const post = await Post.findById(params.id);
			const newHeadline = new Headline({ post: post._id, title: post.title });
			await newHeadline.save();
			return new Response("Headline Added", { status: 200 });
		} else {
			return new Response("Already exists as headline", { status: 200 });
		}
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
};

export const DELETE = async (request, { params }) => {
	try {
		await connectDB();
		const lookupHeadline = await Headline.findOne({ post: params.id });
		if (lookupHeadline) {
			await lookupHeadline.deleteOne();
			return new Response("Headline Removed", { status: 200 });
		} else {
			return new Response("No headline found to delete", { status: 404 });
		}
	} catch (error) {
		return new Response("Error deleting headline", { status: 500 });
	}
};
