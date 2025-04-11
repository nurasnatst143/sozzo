import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '../../../../../config/connectDB';
import Post from '../../../../../models/post';

export const POST = async request => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    await connectDB();

    const body = await request.json();

    const findPost = await Post.findById(body.id);

    if (!findPost) {
      return new Response('Post Not Found', { status: 404 });
    }

    const commentData = {
      user: session.user.id,
      text: body.message,
      name: session.user.name,
      avatar: session.user.image,
    };

    findPost.comments.unshift(commentData);

    await findPost.save();

    return new Response(
      JSON.stringify(
        { comments: findPost.comments },
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    return new Response('Something Went Wrong', { status: 500 });
  }
};
