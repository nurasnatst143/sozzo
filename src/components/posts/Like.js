"use client";
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
const Like = ({ handleLike, session, news }) => {
	const [liked, setLiked] = useState(news.userLiked);

	return (
		<FaHeart
			className={`${
				liked
					? "text-2xl cursor-pointer text-red-400"
					: "text-2xl cursor-pointer"
			}`}
			onClick={() => {
				setLiked(true);
				handleLike();
			}}
		/>
	);
};

export default Like;
