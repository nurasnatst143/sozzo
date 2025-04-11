import connectDB from '../../../../config/connectDB';
import Carousel from '../../../../models/carousel';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import cloudinary from '../../../../config/cloudinary';
import {revalidatePath} from 'next/cache'

export const GET = async request => {
  try {
    await connectDB();

    const posts = await Carousel.find({});

    const path = request.nextUrl.searchParams.get('path')

    if(path){
          revalidatePath(path)
          return new Response(JSON.stringify({ posts }), {
            status: 200
          });
        }

    return new Response(JSON.stringify({ posts }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async request => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session?.user?.role !== 'admin') {
      return new Response('Unauthorized', {
        status: 401,
      });
    }
    await connectDB();
    const formData = await request.formData();
    const description = formData.get('description');
    const image = formData.get('image');

    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: 'sozoo',
      }
    );

    const postData = {
      description,
      image: {
        imageurl: result.secure_url,
        public_id: result.public_id,
      },
    };

    const newPost = new Carousel(postData);

    await newPost.save();

    return Response.redirect(
      `${process.env.URL_DOMAIN}/admin/carousel/add-item/success`
    );
  } catch (error) {
    console.log(error);
    return new Response('failed to add post', {
      status: 500,
    });
  }
};

export const DELETE = async request => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session?.user?.role !== 'admin') {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    const requestHeaders = new Headers(request.headers);

    const postId = requestHeaders.get('Id');

    await connectDB();

    const findPost = await Carousel.findById(postId);

    if (findPost) {
      await findPost.deleteOne();
      return new Response(JSON.stringify({ msg: 'success' }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ msg: 'Not Found' }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
