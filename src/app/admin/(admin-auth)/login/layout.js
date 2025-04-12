import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const layout = async ({ children }) => {
	const session = await getServerSession(authOptions);

	return (
		<>
			<AuthProvider session={session}>
				<ToastContainer position='top-right' autoClose={3000} hideProgressBar />
				<div className=' bg-gray-900 p-2'>{children}</div>
			</AuthProvider>
		</>
	);
};

export default layout;
