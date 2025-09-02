import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import User from "../../../../../models/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "../../../../../config/connectDB";
import RowActions from "./row-actons";

export const dynamic = "force-dynamic"; // always fresh

export default async function UsersPage({ searchParams }) {
	const session = await getServerSession(authOptions);
	if (!session || session.user?.role !== "admin") {
		redirect("/auth/signin?callbackUrl=/admin/users");
	}

	const q = (searchParams?.q || "").trim();
	const role = searchParams?.role || "user";
	const status = searchParams?.status || "all";
	const page = Math.max(1, parseInt(searchParams?.page || "1", 10));
	const limit = 20;
	const skip = (page - 1) * limit;

	await connectDB();

	// Build filters
	const filter = {};
	if (q) {
		filter.$or = [
			{ name: new RegExp(q, "i") },
			{ email: new RegExp(q, "i") },
			{ username: new RegExp(q, "i") },
		];
	}
	if (role !== "all") filter.role = role;
	if (status !== "all") filter.status = status;

	const [total, users] = await Promise.all([
		User.countDocuments(filter),
		User.find(filter)
			.select("_id name email username role status image createdAt")
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.lean(),
	]);

	const totalPages = Math.max(1, Math.ceil(total / limit));

	const makeHref = (overrides = {}) => {
		const params = new URLSearchParams({
			q,
			role,
			status,
			page: String(page),
			...Object.fromEntries(
				Object.entries(overrides).filter(([, v]) => v !== undefined)
			),
		});
		// Remove empties
		if (!params.get("q")) params.delete("q");
		if (params.get("role") === "all") params.delete("role");
		if (params.get("status") === "all") params.delete("status");
		if (params.get("page") === "1") params.delete("page");
		return `/admin/users${params.toString() ? `?${params.toString()}` : ""}`;
	};

	return (
		<main className='max-w-6xl mx-auto px-4 py-8'>
			<header className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
				<div>
					<h1 className='text-2xl font-semibold'>All Users</h1>
					<p className='text-sm text-gray-500'>
						{total} user{total !== 1 ? "s" : ""} • page {page} of {totalPages}
					</p>
				</div>

				{/* Filters */}
				<form className='w-full sm:w-auto grid grid-cols-1 sm:grid-cols-4 gap-2'>
					<input
						name='q'
						defaultValue={q}
						placeholder='Search name, email, username'
						className='rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 text-black focus:ring-gray-300'
					/>
					<select
						name='role'
						defaultValue={role}
						className='rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 text-black focus:ring-gray-300'
					>
						<option value='all'>All roles</option>
						<option value='admin'>Admin</option>
						<option value='subadmin'>Subadmin</option>
						<option value='user'>User</option>
					</select>
					<select
						name='status'
						defaultValue={status}
						className='rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 text-black focus:ring-gray-300'
					>
						<option value='all'>All status</option>
						<option value='active'>Active</option>
						<option value='suspended'>Suspended</option>
						<option value='deleted'>Deleted</option>
					</select>
					<button className='rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90'>
						Apply
					</button>
				</form>
			</header>

			{/* Table */}
			{users.length === 0 ? (
				<div className='rounded-lg border border-dashed p-8 text-center text-gray-500'>
					No users found.
				</div>
			) : (
				<div className='overflow-x-auto rounded-lg border bg-white text-black'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									User
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Email
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Username
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Role
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Status
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Joined
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100 bg-white text-black'>
							{users.map((u) => (
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
									<td className='px-4 py-3'>{u.username || "-"}</td>
									<td className='px-4 py-3'>
										<span
											className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
												u.role === "admin"
													? "bg-purple-100 text-purple-700"
													: u.role === "subadmin"
													? "bg-blue-100 text-blue-700"
													: "bg-gray-100 text-gray-700"
											}`}
										>
											{u.role}
										</span>
									</td>
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
									<td className='px-4 py-3'>
										<RowActions user={u} meId={session.user.id} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* Pagination */}
			{(() => {
				// Build a compact page list with ellipses
				const buildItems = (page, total) => {
					const items = [];
					if (total <= 9) {
						for (let i = 1; i <= total; i++) items.push(i);
						return items;
					}
					const start = Math.max(2, page - 2);
					const end = Math.min(total - 1, page + 2);

					items.push(1);
					if (start > 2) items.push("ellipsis-left");
					for (let i = start; i <= end; i++) items.push(i);
					if (end < total - 1) items.push("ellipsis-right");
					items.push(total);
					return items;
				};

				const items = buildItems(page, totalPages);

				return (
					<nav
						className='mt-6 flex items-center justify-center gap-2'
						aria-label='Pagination'
					>
						{/* First & Prev */}
						<a
							href={makeHref({ page: "1" })}
							className={`rounded-md border px-3 py-2 text-sm ${
								page <= 1
									? "pointer-events-none opacity-50"
									: "hover:bg-gray-50"
							}`}
							aria-disabled={page <= 1}
						>
							« First
						</a>
						<a
							href={makeHref({ page: String(Math.max(1, page - 1)) })}
							className={`rounded-md border px-3 py-2 text-sm ${
								page <= 1
									? "pointer-events-none opacity-50"
									: "hover:bg-gray-50"
							}`}
							aria-disabled={page <= 1}
						>
							← Prev
						</a>

						{/* Numbered buttons */}
						<ul className='mx-1 flex items-center gap-1'>
							{items.map((it, idx) =>
								typeof it === "number" ? (
									<li key={it}>
										<a
											href={makeHref({ page: String(it) })}
											aria-current={page === it ? "page" : undefined}
											className={`h-9 w-9 rounded-md border text-sm flex items-center justify-center
                  ${
										page === it
											? "bg-black text-white border-black"
											: "hover:bg-gray-50"
									}`}
										>
											{it}
										</a>
									</li>
								) : (
									<li key={it + idx} className='px-2 text-gray-400 select-none'>
										…
									</li>
								)
							)}
						</ul>

						{/* Next & Last */}
						<a
							href={makeHref({ page: String(Math.min(totalPages, page + 1)) })}
							className={`rounded-md border px-3 py-2 text-sm ${
								page >= totalPages
									? "pointer-events-none opacity-50"
									: "hover:bg-gray-50"
							}`}
							aria-disabled={page >= totalPages}
						>
							Next →
						</a>
						<a
							href={makeHref({ page: String(totalPages) })}
							className={`rounded-md border px-3 py-2 text-sm ${
								page >= totalPages
									? "pointer-events-none opacity-50"
									: "hover:bg-gray-50"
							}`}
							aria-disabled={page >= totalPages}
						>
							Last »
						</a>
					</nav>
				);
			})()}
		</main>
	);
}
