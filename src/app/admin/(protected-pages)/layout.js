import Nav from "@/components/admin/nav/Nav";

import AdminNav from "@/components/admin/nav/AdminAsideNav";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const layout = async ({ children }) => {
	const session = await getServerSession(authOptions);
	console.log("ss", session);

	if (!session || session.user.role !== "admin") redirect("/admin/login");

	return (
		<>
			<AuthProvider session={session}>
				<ToastContainer position='top-right' autoClose={3000} hideProgressBar />
				<div className='bg-blue-600 dark:bg-black'>
					<div className='max-w-[1400px] mx-auto'>
						<Nav />
					</div>
				</div>
				<div className='max-w-[1400px] mx-auto px-2 min-h-[80vh] grid grid-cols-4 gap-4'>
					<div className='h-full bg-gray-900'>
						<AdminNav />
					</div>

					<div className='col-span-3 bg-gray-900 p-2'>{children}</div>
				</div>
			</AuthProvider>
		</>
	);
};

export default layout;
