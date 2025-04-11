import Link from 'next/link';

const AdminNav = () => {
  return (
    <div className="flex flex-col items-center gap-2 py-5">
      <Link href="/admin/create-post" className="text-lg font-semibold">
        Add post
      </Link>
      <Link href="/admin/all-posts" className="text-lg font-semibold">
        All posts
      </Link>
      <Link href="/admin/headline" className="text-lg font-semibold">
        Headline
      </Link>
      <Link href="/admin/carousel" className="text-lg font-semibold">
        Carousel
      </Link>
    </div>
  );
};

export default AdminNav;
