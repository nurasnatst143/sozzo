import connectDB from '../../../../../config/connectDB';
import Post from '../../../../../models/post';
import {revalidatePath} from 'next/cache'

export const GET = async request => {
  try {
    await connectDB();

    const posts = await Post.find({});

    const path = request.nextUrl.searchParams.get('path')

    console.log(path)

    if(path){
      revalidatePath(path)
      return new Response(JSON.stringify({ posts }), {
        status: 200
      });
    }


    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
