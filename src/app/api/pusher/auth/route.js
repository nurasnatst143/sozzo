import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { pusherServer } from "@/lib/pusher";

export const POST = async (req) => {
	const session = await getServerSession(authOptions);
	if (!session) return new Response("Unauthorized", { status: 401 });

	// Parse form data instead of JSON
	const formData = await req.formData();
	const socketId = formData.get("socket_id");
	const channel = formData.get("channel_name");

	console.log("socket_id", socketId);
	console.log("channel_name", channel);

	const auth = pusherServer.authorizeChannel(socketId, channel, {
		user_id: session.user.id,
	});

	return new Response(JSON.stringify(auth), {
		headers: { "Content-Type": "application/json" },
	});
};
