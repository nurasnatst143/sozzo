"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";

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
	const [editForm, setEditForm] = useState({
		name: "",
		parent_id: "",
		is_featured: false,
		status: "active",
	});

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
			resetModal();
		} catch (err) {
			console.error("Add failed:", err);
		}
	};

	const handleEditCategory = async () => {
		try {
			const res = await fetch(`/api/category/${editingId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: editForm.name,
					slug: slugify(editForm.name),
					parent_id: editForm.parent_id || null,
					is_featured: editForm.is_featured,
					status: editForm.status,
				}),
			});
			const updated = await res.json();

			const updateTree = (list) =>
				list.map((cat) => {
					if (cat._id === editingId) return { ...cat, ...updated };
					if (cat.children)
						return { ...cat, children: updateTree(cat.children) };
					return cat;
				});

			setCategories((prev) => updateTree(prev));
			resetModal();
		} catch (err) {
			console.error("Edit failed:", err);
		}
	};

	const resetModal = () => {
		setNewCategory("");
		setParentId("");
		setIsFeatured(false);
		setStatus("active");
		setEditingId(null);
		setEditForm({
			name: "",
			parent_id: "",
			is_featured: false,
			status: "active",
		});
		setShowModal(false);
	};

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
							<div className='bg-card flex gap-2 justify-center items-center p-2 rounded-md'>
								<span className='text-sm font-medium'>{category.name}</span>
								<span className='text-xs '>
									({category.status},{" "}
									{category.is_featured ? "Featured" : "Not Featured"})
								</span>
								<button
									className='text-neutral hover:text-primary'
									onClick={() => {
										setEditingId(category._id);
										setEditForm({
											name: category.name,
											parent_id: category.parent_id || "",
											is_featured: category.is_featured,
											status: category.status,
										});
										setShowModal(true);
									}}
								>
									<Pencil size={14} />
								</button>
							</div>
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
					className='bg-card text-primary px-3 py-1 rounded flex items-center gap-1 hover:bg-secondary'
				>
					<Plus size={16} /> Add Category
				</button>
			</div>
			{renderCategories(categories)}

			{/* Modal */}
			{showModal && (
				<div className='fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center'>
					<div className='bg-card text-black rounded shadow-lg p-6 w-full max-w-md'>
						<h3 className='text-lg text-primary font-semibold mb-4'>
							{editingId ? "Edit Category" : "Add New Category"}
						</h3>

						{/* Name */}
						<input
							type='text'
							placeholder='Category name'
							value={editingId ? editForm.name : newCategory}
							onChange={(e) =>
								editingId
									? setEditForm({ ...editForm, name: e.target.value })
									: setNewCategory(e.target.value)
							}
							className='border w-full px-3 py-2 rounded mb-2'
						/>

						{/* Slug preview */}
						{(editingId ? editForm.name : newCategory) && (
							<p className='text-xs text-muted mb-3'>
								Slug:{" "}
								<code className='bg-neutral px-2 py-0.5 rounded'>
									{slugify(editingId ? editForm.name : newCategory)}
								</code>
							</p>
						)}

						{/* Parent */}
						<select
							value={editingId ? editForm.parent_id : parentId}
							onChange={(e) =>
								editingId
									? setEditForm({ ...editForm, parent_id: e.target.value })
									: setParentId(e.target.value)
							}
							className='border w-full px-3 py-2 rounded mb-3'
						>
							<option value=''>-- No Parent (Top Level) --</option>
							{renderCategoryOptions(categories)}
						</select>

						{/* Featured */}
						<label className='flex items-center text-primary gap-2 text-sm mb-3'>
							<input
								type='checkbox'
								checked={editingId ? editForm.is_featured : isFeatured}
								onChange={(e) =>
									editingId
										? setEditForm({
												...editForm,
												is_featured: e.target.checked,
										  })
										: setIsFeatured(e.target.checked)
								}
							/>
							Is Featured
						</label>

						{/* Status */}
						<select
							value={editingId ? editForm.status : status}
							onChange={(e) =>
								editingId
									? setEditForm({ ...editForm, status: e.target.value })
									: setStatus(e.target.value)
							}
							className='border w-full px-3 py-2 rounded mb-4'
						>
							<option value='active'>Active</option>
							<option value='inactive'>Inactive</option>
						</select>

						{/* Buttons */}
						<div className='flex justify-end gap-2'>
							<button
								onClick={resetModal}
								className='px-4 py-2 rounded border bg-muted text-primary'
							>
								Cancel
							</button>
							<button
								onClick={editingId ? handleEditCategory : handleAddCategory}
								className='px-4 py-2 bg-sky text-white rounded '
							>
								{editingId ? "Update" : "Add"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
