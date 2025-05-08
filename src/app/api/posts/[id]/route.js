import connectDB from "../../../../../config/connectDB";
import Post from "../../../../../models/post";
import Headline from "../../../../../models/headline";
import cloudinary from "../../../../../config/cloudinary";
export const GET = async (request, { params }) => {
	try {
		await connectDB();

		const post = await Post.findById(params.id);

		if (!post) {
			return new Response("Not Found", {
				status: 404,
			});
		}

		return new Response(JSON.stringify({ post }), {
			status: 200,
		});
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
};

export const DELETE = async (request, { params }) => {
	try {
		await connectDB();

		const post = await Post.findById(params.id);

		if (!post) {
			return new Response("Not Found", {
				status: 404,
			});
		}

		const foundedHeadline = await Headline.findOne({ post: post._id });

		if (foundedHeadline) {
			await foundedHeadline.deleteOne();
		}

		await post.deleteOne();

		return new Response(JSON.stringify({ msg: "Deleted successfully" }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response("Something went wrong", { status: 500 });
	}
};

export const PUT = async (request, { params }) => {
	try {
		await connectDB();

		const formData = await request.formData();

		const title = formData.get("title");
		const description = formData.get("description");
		const category = formData.get("category");
		const featured = formData.get("featured") === "true";
		const viralPost = formData.get("viralPost") === "true";
		const image = formData.get("image"); // could be string (existing) or file (new)

		const post = await Post.findById(params.id);
		if (!post) {
			return new Response("Post not found", { status: 404 });
		}

		let updatedImage = post.image;

		// If image is a new file
		if (image && typeof image !== "string") {
			// Delete old image from Cloudinary
			if (post.image?.public_id) {
				await cloudinary.uploader.destroy(post.image.public_id);
			}

			// Convert file to base64
			const imageBuffer = await image.arrayBuffer();
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);
			const imageBase64 = imageData.toString("base64");

			// Upload to Cloudinary
			const result = await cloudinary.uploader.upload(
				`data:image/png;base64,${imageBase64}`,
				{
					folder: "sozoo",
				}
			);

			updatedImage = {
				imageurl: result.secure_url,
				public_id: result.public_id,
			};
		}

		const updatedPost = await Post.findByIdAndUpdate(
			params.id,
			{
				title,
				description,
				category,
				image: updatedImage,
				featured,
				viralPost,
			},
			{ new: true }
		);

		return new Response(JSON.stringify({ post: updatedPost }), {
			status: 200,
		});
	} catch (error) {
		console.error("PUT error:", error);
		return new Response("Failed to update post", { status: 500 });
	}
};
