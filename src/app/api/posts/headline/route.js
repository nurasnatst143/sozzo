import connectDB from '../../../../../config/connectDB';
import Headline from '../../../../../models/headline';
import {revalidatePath} from 'next/cache'

export const GET = async request => {
  try {
    await connectDB();
    const headlines = await Headline.find({}).lean().exec();
    const path = request.nextUrl.searchParams.get('path')

    if(path){
          revalidatePath(path)
          return new Response(JSON.stringify({ headlines }), {
            status: 200
          });
        }

    return new Response(JSON.stringify({ headlines }), {
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
