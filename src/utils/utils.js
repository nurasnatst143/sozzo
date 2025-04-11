import axios from 'axios';

export const getPosts = async cb => {
  cb(x => ({ ...x, status: 'loading' }));
  const res = await axios.get(`/api/posts/all-posts`);
  if (res.status === 200) {
    cb({ data: res.data.posts, status: 'idle' });
  } else {
    cb({ data: [], status: 'idle' });
  }
};

export const getPost = async (cb, id) => {
  cb(x => ({ ...x, status: 'loading' }));
  const res = await axios.get(`/api/posts/${id}`);
  if (res.status === 200) {
    cb({ data: res.data.post, status: 'idle' });
  } else {
    cb({ data: [], status: 'idle' });
  }
};

export const getFeaturedPosts = async cb => {
  cb(x => ({ ...x, status: 'loading' }));
  const res = await axios.get(`/api/posts/featured-posts`);
  if (res.status === 200) {
    cb({ data: res.data.posts, status: 'idle' });
  } else {
    cb({ data: null, status: 'idle' });
  }
};

export const getCategoryPosts = async (category, cb) => {
  const res = await axios.get(`/api/posts/category`, {
    headers: {
      type: category,
    },
  });
  if (res.status === 200) {
    cb({ data: res.data.posts, status: 'idle' });
  } else {
    cb({ data: [], status: 'idle' });
  }
};

export const deletePost = async (cb, id) => {
  const res = await axios.delete(`/api/posts/${id}`);
  if (res.status === 200) {
    cb(x => {
      const updatedData = x.data.filter(y => y._id !== id);

      return {
        data: updatedData,
        status: x.status,
      };
    });
  }
};

export const getHeadlines = async cb => {
  const res = await axios.get(`/api/posts/headline`);
  if (res.status === 200) {
    cb(x => ({ ...x, data: res.data.headlines, status: 'idle' }));
  } else {
    cb(x => ({ ...x, status: 'idle' }));
  }
};

export const handleHeadline = async id => {
  const url = `/api/posts/headline/${id}`;
  await axios.get(url);
};

export const getCarouselData = async cb => {
  const res = await axios.get(`/api/carousel`);
  if (res.status === 200) {
    cb(x => ({ ...x, data: res.data.posts, status: 'idle' }));
  } else {
    cb(x => ({ ...x, status: 'idle' }));
  }
};

export const deleteCarouselData = async (id, cb) => {
  const res = await axios.delete(`/api/carousel`, {
    headers: {
      Id: id,
    },
  });

  if (res.status === 200) {
    cb(x => ({
      ...x,
      data: x.data.filter(y => y._id !== id),
    }));
  }
};


export const getViralPosts = async cb => {
  cb(prev => ({ ...prev, status: 'loading' }));
  
  try {
    const res = await axios.get(`/api/posts/all-posts`);
    
    if (res.status === 200) {
      const viralPosts = res.data.posts.filter(post => post.viralPost === true);
      cb({ data: viralPosts, status: 'idle' });
    } else {
      cb({ data: [], status: 'idle' });
    }
  } catch (error) {
    console.error('Error fetching viral posts:', error);
    cb({ data: [], status: 'idle' });
  }
};
