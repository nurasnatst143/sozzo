"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSubadminForm() {
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		role: "subadmin",
		authProvider: "email",
		username: "",
	});
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState(null);
	const router = useRouter();

	const onChange = (e) =>
		setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMsg(null);
		try {
			const res = await fetch("/api/subadmins", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Failed to create sub-admin");
			setMsg({ type: "success", text: "Sub-admin created" });
			setForm({ name: "", email: "", password: "" });
			router.refresh(); // refresh server page list
			setOpen(false);
		} catch (err) {
			setMsg({ type: "error", text: err.message });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-full'>
			<div className='flex justify-end'>
				<button
					onClick={() => setOpen((o) => !o)}
					className='inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90'
				>
					{open ? "Close" : "New Sub-Admin"}
				</button>
			</div>

			{open && (
				<form
					onSubmit={onSubmit}
					className='mt-4 grid gap-3 rounded-lg border p-4 bg-white text-black'
				>
					<div>
						<label className='block text-sm font-medium mb-1'>Name</label>
						<input
							name='name'
							value={form.name}
							onChange={onChange}
							className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
							placeholder='Full name'
							required
							disabled={loading}
						/>
					</div>
					<div>
						<label className='block text-sm font-medium mb-1'>Username</label>
						<input
							name='username'
							value={form.username}
							onChange={onChange}
							className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
							placeholder='Full name'
							required
							disabled={loading}
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
							placeholder='email@example.com'
							required
							disabled={loading}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium mb-1'>
							Temporary Password
						</label>
						<input
							type='password'
							name='password'
							value={form.password}
							onChange={onChange}
							className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
							placeholder='Min 6 characters'
							required
							disabled={loading}
						/>
					</div>

					<div className='flex items-center justify-end gap-2'>
						<button
							type='button'
							onClick={() => setOpen(false)}
							className='rounded-md border px-4 py-2 text-sm hover:bg-gray-50'
							disabled={loading}
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={loading}
							className='rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 flex items-center gap-2'
						>
							{loading ? (
								<span className='animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full' />
							) : (
								"Create"
							)}
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
			)}
		</div>
	);
}
