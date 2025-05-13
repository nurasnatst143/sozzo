import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const DisplayPostInfo = ({ news }) => {
	const descriptionSnippet = (() => {
		try {
			const match = news.description
				.replace(/ style="[^"]*"/g, "")
				.match(/<p[^>]*>(.*?)<\/p>/);
			return match ? match[1] : "No description available.";
		} catch {
			return "No description available.";
		}
	})();

	return (
		<div className='p-4'>
			<div className='bg-background border dark:bg-background rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
				<div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
					<div className='sm:col-span-1 flex items-center justify-center p-2'>
						<Image
							src={news.image.imageurl}
							width={120}
							height={120}
							alt={news._id}
							className='rounded-lg object-cover h-28 w-28'
						/>
					</div>
					<div className='sm:col-span-3 flex flex-col justify-between p-2 text-primary'>
						<div>
							<h2 className='text-lg sm:text-xl font-semibold mb-1 text-primary  line-clamp-2'>
								{news.title}
							</h2>
							<p
								className='text-sm sm:text-base text-muted-foreground line-clamp-2'
								dangerouslySetInnerHTML={{ __html: descriptionSnippet }}
							/>
						</div>

						<div className='mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground dark:text-gray-400'>
							<span>👍 {news.likeCount || 0} Likes</span>
							<span>💬 {news.commentCount || 0} Comments</span>
							<span>
								📅{" "}
								{formatDistanceToNow(new Date(news.createdAt), {
									addSuffix: true,
								})}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DisplayPostInfo;
