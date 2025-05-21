"use client";
import { FaHeart } from "react-icons/fa6";
const Like = ({ handleLike, session, news }) => {
	return (
		<FaHeart
			className={`${
				news.userLiked
					? "text-2xl cursor-pointer text-red-400"
					: "text-2xl cursor-pointer"
			}`}
			onClick={handleLike}
		/>
	);
};

export default Like;
