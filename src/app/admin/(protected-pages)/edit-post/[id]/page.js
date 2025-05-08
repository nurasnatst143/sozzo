"use client";
import EditPostForm from "@/components/posts/editPostFrom"; // Correct the import path
import { useParams } from "next/navigation";

const Page = () => {
	const { id } = useParams(); // Access the router

	// Ensure the id is available before rendering the form
	if (!id) {
		return <p>Loading...</p>; // Or handle loading state
	}

	return <EditPostForm postId={id} />; // Pass the id as a prop to EditPostForm
};

export default Page;
