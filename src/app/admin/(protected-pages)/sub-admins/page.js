import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import User from "../../../../../models/user";
import NewSubadminForm from "./sub-admin-form"; // 👈 add this
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "../../../../../config/connectDB";

export const dynamic = "force-dynamic";

export default async function SubadminsPage() {
	const session = await getServerSession(authOptions);
	if (!session || session.user?.role !== "admin") {
		redirect("/auth/signin?callbackUrl=/admin/subadmins");
	}

	await connectDB();
	const subs = await User.find({ role: "subadmin" })
		.select("_id name email status image createdAt")
		.sort({ createdAt: -1 })
		.lean();

	return (
		<main className='max-w-5xl mx-auto px-4 py-8'>
			<header className='mb-6 flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-semibold'>Sub-Admins</h1>
					<p className='text-sm text-gray-500'>
						{subs.length} total sub-admin{subs.length !== 1 ? "s" : ""}
					</p>
				</div>
				<NewSubadminForm /> {/* 👈 create button + form */}
			</header>
			{subs.length === 0 ? (
				<div className='rounded-lg border border-dashed p-8 text-center text-gray-500'>
					No sub-admins found.
				</div>
			) : (
				<div className='overflow-x-auto rounded-lg border'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50 text-black'>
							<tr>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									User
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Email
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Status
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Joined
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100 bg-white text-black'>
							{subs.map((u) => (
								<tr key={u._id}>
									<td className='px-4 py-3 flex items-center gap-3'>
										<img
											src={u.image || "/avatar.png"}
											alt={u.name || "User"}
											className='h-9 w-9 rounded-full object-cover'
										/>
										<div>
											<div className='font-medium'>{u.name}</div>
											<div className='text-xs text-gray-500'>
												ID: {u._id.toString()}
											</div>
										</div>
									</td>
									<td className='px-4 py-3'>{u.email || "-"}</td>
									<td className='px-4 py-3'>
										<span
											className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
												u.status === "active"
													? "bg-green-100 text-green-700"
													: u.status === "suspended"
													? "bg-yellow-100 text-yellow-700"
													: "bg-gray-100 text-gray-700"
											}`}
										>
											{u.status}
										</span>
									</td>
									<td className='px-4 py-3 text-sm text-gray-600'>
										{new Date(u.createdAt).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</main>
	);
}
