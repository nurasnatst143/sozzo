import Logout from '@/components/auth/Logout';
import Nav from '@/components/nav/Nav';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  return (
    <div>
      <div className="bg-blue-600 dark:bg-black">
        <div className="max-w-[1400px] mx-auto">
          <Nav />
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default page;
