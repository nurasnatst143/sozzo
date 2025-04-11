'use client';
import { FaHeart } from 'react-icons/fa6';
const Like = ({ handleLike, session, news }) => {
  let liked = [];

  if (news.likes.length > 0 && session.data) {
    liked = news.likes.filter(item => item.user === session.data.user.id);
  }

  return (
    <FaHeart
      className={`${
        liked.length > 0
          ? 'text-2xl cursor-pointer text-red-400'
          : 'text-2xl cursor-pointer'
      }`}
      onClick={handleLike}
    />
  );
};

export default Like;
