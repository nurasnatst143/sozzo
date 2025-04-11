import DescWrapper from '@/components/posts/DescWrapper';

import posts from '@/data/posts';
import DisplayPostDesc from '@/components/posts/DisplayPostDesc ';

const page = () => {
  const news = posts[0];
  return (
    <DescWrapper>
      <DisplayPostDesc news={news} />
    </DescWrapper>
  );
};

export default page;
