import connectDB from '../../../../../../config/connectDB';
import Post from '../../../../../../models/post';
import Headline from '../../../../../../models/headline';

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const lookupHeadline = await Headline.findOne({ post: params.id });

    if (!lookupHeadline) {
      const post = await Post.findById(params.id);
      const headlineData = {
        post: post._id,
        title: post.title,
      };
      const newHeadline = new Headline(headlineData);
      await newHeadline.save();
      return new Response('Headline Added', {
        status: 200,
      });
    } else {
      await lookupHeadline.deleteOne();

      return new Response('Headline Removed', {
        status: 200,
      });
    }
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
