"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubadminRowActions({ user }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [busy, setBusy] = useState(false);
	const [msg, setMsg] = useState(null);

	// Local edit state
	const [form, setForm] = useState({
		name: user?.name || "",
		email: user?.email || "",
		username: user?.username || "",
		status: user?.status || "verified",
		password: "", // optional reset
	});

	const onChange = (e) => {
		const { name, value } = e.target;
		setForm((p) => ({ ...p, [name]: value }));
	};

	const onSave = async (e) => {
		e.preventDefault();
		setBusy(true);
		setMsg(null);
		try {
			const payload = {
				name: form.name,
				email: form.email,
				username: form.username,
				status: form.status,
			};
			if (form.password.trim().length > 0) payload.password = form.password;

			const res = await fetch(`/api/subadmins/${user.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Failed to update sub-admin");

			setMsg({ type: "success", text: "Sub-admin updated" });
			setOpen(false);
			router.refresh();
		} catch (err) {
			setMsg({ type: "error", text: err?.message || "Something went wrong" });
		} finally {
			setBusy(false);
		}
	};

	const onDelete = async () => {
		if (
			!confirm(
				`Delete sub-admin "${
					user?.name || user?.email
				}"? This cannot be undone.`
			)
		)
			return;
		setBusy(true);
		setMsg(null);
		try {
			const res = await fetch(`/api/subadmins/${user.id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Failed to delete sub-admin");

			setMsg({ type: "success", text: "Sub-admin deleted" });
			router.refresh();
		} catch (err) {
			setMsg({ type: "error", text: err?.message || "Something went wrong" });
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className='flex items-center gap-2'>
			<button
				onClick={() => setOpen(true)}
				className='rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50'
				disabled={busy}
			>
				Edit
			</button>
			<button
				onClick={onDelete}
				className='rounded-md bg-red-600 text-white px-3 py-1.5 text-sm hover:opacity-90 disabled:opacity-60'
				disabled={busy}
			>
				Delete
			</button>

			{/* Modal */}
			{open && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'>
					<div className='w-full max-w-lg rounded-xl bg-white p-5 shadow-lg'>
						<div className='mb-3 flex items-center justify-between'>
							<h3 className='text-lg font-semibold'>Edit Sub-Admin</h3>
							<button
								className='text-sm text-gray-600 hover:text-black'
								onClick={() => setOpen(false)}
								disabled={busy}
							>
								Close
							</button>
						</div>

						<form onSubmit={onSave} className='grid gap-3'>
							<div>
								<label className='block text-sm font-medium mb-1'>Name</label>
								<input
									name='name'
									value={form.name}
									onChange={onChange}
									className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
									disabled={busy}
									required
								/>
							</div>

							<div>
								<label className='block text-sm font-medium mb-1'>
									Username
								</label>
								<input
									name='username'
									value={form.username}
									onChange={onChange}
									className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
									disabled={busy}
									required
								/>
							</div>

							<div>
								<label className='block text-sm font-medium mb-1'>Email</label>
								<input
									type='email'
									name='email'
									value={form.email}
									onChange={onChange}
									className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
									disabled={busy}
									required
								/>
							</div>

							<div>
								<label className='block text-sm font-medium mb-1'>Status</label>
								<select
									name='status'
									value={form.status}
									onChange={onChange}
									className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
									disabled={busy}
								>
									<option value='active'>active</option>
									<option value='suspended'>suspended</option>
									<option value='verified'>verified</option>
								</select>
							</div>

							<div>
								<label className='block text-sm font-medium mb-1'>
									Reset Password (optional)
								</label>
								<input
									type='password'
									name='password'
									value={form.password}
									onChange={onChange}
									className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
									placeholder='Leave blank to keep current'
									disabled={busy}
								/>
							</div>

							<div className='mt-2 flex items-center justify-end gap-2'>
								<button
									type='button'
									onClick={() => setOpen(false)}
									className='rounded-md border px-4 py-2 text-sm hover:bg-gray-50'
									disabled={busy}
								>
									Cancel
								</button>
								<button
									type='submit'
									className='rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-60'
									disabled={busy}
								>
									{busy ? "Saving..." : "Save changes"}
								</button>
							</div>

							{msg && (
								<p
									className={`text-sm ${
										msg.type === "success" ? "text-green-600" : "text-red-600"
									}`}
								>
									{msg.text}
								</p>
							)}
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
