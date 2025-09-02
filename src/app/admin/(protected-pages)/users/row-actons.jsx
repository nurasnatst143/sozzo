"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RowActions({ user, meId }) {
	const router = useRouter();
	const [busy, setBusy] = useState(false);
	const isSelf = String(user._id) === String(meId);
	const isAdmin = user.role === "admin";

	const run = async (action) => {
		if (busy) return;
		if (action === "delete" && !confirm("Delete this user? (soft delete)"))
			return;

		setBusy(true);
		try {
			const res = await fetch(`/api/users/${user._id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Action failed");
			router.refresh();
		} catch (e) {
			alert(e.message);
		} finally {
			setBusy(false);
		}
	};

	const disabled = busy || isSelf || isAdmin; // safety

	return (
		<div className='flex items-center gap-2'>
			{user.status === "active" ? (
				<button
					onClick={() => run("block")}
					disabled={disabled}
					className='rounded-md border px-2 py-1 text-xs hover:bg-yellow-50 disabled:opacity-50'
					title={disabled ? "Not allowed" : "Block user"}
				>
					Block
				</button>
			) : user.status === "suspended" ? (
				<button
					onClick={() => run("unblock")}
					disabled={disabled}
					className='rounded-md border px-2 py-1 text-xs hover:bg-green-50 disabled:opacity-50'
					title={disabled ? "Not allowed" : "Unblock user"}
				>
					Unblock
				</button>
			) : (
				<span className='text-xs text-gray-400 select-none'>deleted</span>
			)}

			<button
				onClick={() => run("delete")}
				disabled={disabled}
				className='rounded-md border border-red-400 text-red-600 px-2 py-1 text-xs hover:bg-red-50 disabled:opacity-50'
				title={disabled ? "Not allowed" : "Delete (soft)"}
			>
				Delete
			</button>
		</div>
	);
}
