import Image from 'next/image';

const DisplayPostInfo = ({ news }) => {
  return (
    <div className="py-1 mx-2">
      <div className="bg-sky-50 dark:bg-gray-600 sm:grid sm:grid-cols-8 gap-5 py-6 px-2 rounded-md">
        <div className="sm:col-span-1 mx-auto flex justify-center">
          <Image
            src={news.image.imageurl}
            width={100}
            height={100}
            alt={news._id}
          />
        </div>
        <div className="sm:col-span-7 px-2 text-black">
          <h1 className="text-xl font-bold mb-1 text-black dark:text-gray-100">
            {news.title}
          </h1>
          <div
            className="text-lg text-black dark:text-sky-100 truncate"
            dangerouslySetInnerHTML={{
              __html: news.description
                .replace(/ style="[^"]*"/g, '')
                .match(/<p[^>]*>(.*?)<\/p>/)[1],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayPostInfo;
