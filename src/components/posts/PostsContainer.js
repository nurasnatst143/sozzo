import Link from "next/link";
import DisplayPostInfo from "./DisplayPostInfo";

const PostsContainer = ({ posts, path }) => {
	return (
		<div className='min-h-[80vh]'>
			{posts.status === "loading" ? (
				<div className='min-h-[80vh] flex justify-center items-center'>
					<p className='text-2Xl font-semibold '>Loading...</p>
				</div>
			) : posts.data.length === 0 ? (
				<div className='min-h-[80vh] flex justify-center items-center'>
					<p className='text-2Xl font-semibold '>No Post To Display</p>
				</div>
			) : (
				posts.data.map((item) => <DisplayPostInfo key={item._id} news={item} />)
			)}
		</div>
	);
};

export default PostsContainer;
