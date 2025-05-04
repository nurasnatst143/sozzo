"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Save } from "lucide-react";

// Simple slugify function
const slugify = (text) =>
	text
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-")
		.replace(/^-+|-+$/g, "");

export default function CategoryManager() {
	const [categories, setCategories] = useState([]);
	const [newCategory, setNewCategory] = useState("");
	const [parentId, setParentId] = useState("");
	const [isFeatured, setIsFeatured] = useState(false);
	const [status, setStatus] = useState("active");
	const [showModal, setShowModal] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [editedName, setEditedName] = useState("");

	// Fetch categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch("/api/category");
				const data = await res.json();
				setCategories(data);
			} catch (err) {
				console.error("Failed to fetch categories:", err);
			}
		};
		fetchCategories();
	}, []);

	// Add category
	const handleAddCategory = async () => {
		if (!newCategory.trim()) return;

		try {
			const res = await fetch("/api/category", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: newCategory,
					slug: slugify(newCategory),
					parent_id: parentId || null,
					is_featured: isFeatured,
					status,
				}),
			});
			const created = await res.json();
			setCategories((prev) => [...prev, created]);
			setNewCategory("");
			setParentId("");
			setIsFeatured(false);
			setStatus("active");
			setShowModal(false);
		} catch (err) {
			console.error("Add failed:", err);
		}
	};

	// Edit category
	const handleEditCategory = async (id, name) => {
		try {
			const res = await fetch(`/api/category/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name }),
			});
			const updated = await res.json();

			const updateName = (list) =>
				list.map((cat) => {
					if (cat._id === id) return { ...cat, name: updated.name };
					if (cat.children) {
						return { ...cat, children: updateName(cat.children) };
					}
					return cat;
				});

			setCategories((prev) => updateName(prev));
			setEditingId(null);
		} catch (err) {
			console.error("Edit failed:", err);
		}
	};

	// Render nested category options for parent selector
	const renderCategoryOptions = (list, depth = 0) => {
		return list.flatMap((cat) => [
			<option key={cat._id} value={cat._id}>
				{`${"— ".repeat(depth)}${cat.name}`}
			</option>,
			...(cat.children ? renderCategoryOptions(cat.children, depth + 1) : []),
		]);
	};

	const renderCategories = (list) => {
		return (
			<ul className='ml-4 space-y-2'>
				{list.map((category) => (
					<li key={category._id} className='flex flex-col items-start gap-1'>
						<div className='flex items-center gap-2'>
							{editingId === category._id ? (
								<>
									<input
										type='text'
										value={editedName}
										onChange={(e) => setEditedName(e.target.value)}
										className='border px-2 py-1 rounded w-48'
									/>
									<button
										className='text-success hover:text-green-600'
										onClick={() => handleEditCategory(category._id, editedName)}
									>
										<Save size={16} />
									</button>
								</>
							) : (
								<>
									<span className='text-sm font-medium'>{category.name}</span>
									<span className='text-xs text-muted'>
										({category.status},{" "}
										{category.is_featured ? "Featured" : "Not Featured"})
									</span>
									<button
										className='text-neutral hover:text-primary'
										onClick={() => {
											setEditingId(category._id);
											setEditedName(category.name);
										}}
									>
										<Pencil size={14} />
									</button>
								</>
							)}
						</div>
						{category.children && renderCategories(category.children)}
					</li>
				))}
			</ul>
		);
	};

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-semibold text-primary'>Categories</h2>
				<button
					onClick={() => setShowModal(true)}
					className='bg-primary text-background px-3 py-1 rounded flex items-center gap-1 hover:bg-secondary'
				>
					<Plus size={16} /> Add Category
				</button>
			</div>
			{renderCategories(categories)}

			{/* Modal */}
			{showModal && (
				<div className='fixed inset-0 z-50 bg-white/50 flex items-center justify-center'>
					<div className='bg-background text-black rounded shadow-lg p-6 w-full max-w-md'>
						<h3 className='text-lg font-semibold mb-4'>Add New Category</h3>

						{/* Category name */}
						<input
							type='text'
							placeholder='Category name'
							value={newCategory}
							onChange={(e) => setNewCategory(e.target.value)}
							className='border w-full px-3 py-2 rounded mb-2'
						/>

						{/* Slug preview */}
						{newCategory && (
							<p className='text-xs text-muted mb-3'>
								Slug:{" "}
								<code className='bg-neutral px-2 py-0.5 rounded'>
									{slugify(newCategory)}
								</code>
							</p>
						)}

						{/* Parent category select */}
						<select
							value={parentId}
							onChange={(e) => setParentId(e.target.value)}
							className='border w-full px-3 py-2 rounded mb-3'
						>
							<option value=''>-- No Parent (Top Level) --</option>
							{renderCategoryOptions(categories)}
						</select>

						{/* Is Featured toggle */}
						<label className='flex items-center gap-2 text-sm mb-3'>
							<input
								type='checkbox'
								checked={isFeatured}
								onChange={(e) => setIsFeatured(e.target.checked)}
							/>
							Is Featured
						</label>

						{/* Status select */}
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className='border w-full px-3 py-2 rounded mb-4'
						>
							<option value='active'>Active</option>
							<option value='inactive'>Inactive</option>
						</select>

						<div className='flex justify-end gap-2'>
							<button
								onClick={() => setShowModal(false)}
								className='px-4 py-2 rounded border text-neutral'
							>
								Cancel
							</button>
							<button
								onClick={handleAddCategory}
								className='px-4 py-2 bg-primary text-background rounded hover:bg-secondary'
							>
								Add
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
