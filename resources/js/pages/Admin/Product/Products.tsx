import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Products = {
    id: number;
    name: string;
    slug: string;
    phone: string;
    image: string;
    image_url: string; // 👈 REQUIRED
    description: string;
    price: number;
    discount_price: number;
    status: 'Active' | 'Inactive';
    brand_id: number;
    category_id: number;
    brand: { id: number; name: string };
    category: { id: number; name: string };
}

type Brand = { id: number; name: string };
type Category = { id: number; name: string };

interface Pagination<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface Props {
    products: Pagination<Products>;
    brands: Brand[];
    categories: Category[];
}

export default function Products({products, brands, categories}: Props) {
    const [tableData, setTableData] = useState<Products[]>(products.data);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProducts, setEditingProducts] = useState<Products | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [slug, setSlug] = useState('');


    const {data, setData, post, delete: destroy, processing, reset, errors} = useForm({
        name: '',
        slug: '',
        phone: '012345678912',
        image: null as File | null,
        description: '',
        price: 0,
        discount_price: 0,
        brand_id: null as number | null,
        category_id: null as number | null,
        status: 'Active',
        _method: 'POST',
    });

    const [sortField, setSortField] = useState<'id' | 'name' | 'price' | 'discount_price' | 'brand' | 'category'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Sorting function
    const handleSort = (field: 'id' | 'name' | 'price' | 'discount_price' | 'brand' | 'category') => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sortedData = [...tableData].sort((a , b) => {
            if (field === 'id') return order === 'asc' ? a.id - b.id : b.id - a.id;
            if (field === 'name') return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            if (field === 'price') return order === 'asc' ? a.price - b.price : b.price - a.price;
            if (field === 'discount_price') return order === 'asc' ? a.discount_price - b.discount_price : b.discount_price - a.discount_price;
            if (field === 'brand') return order === 'asc' ? a.brand.name.localeCompare(b.brand.name) : b.brand.name.localeCompare(a.brand.name);
            if (field === 'category') return order === 'asc' ? a.category.name.localeCompare(b.category.name) : b.category.name.localeCompare(a.category.name);

        });
        setTableData(sortedData);
    }

    // Filter + search
    const filterProducts = tableData.filter((cat) => {
        const matchesStatus = statusFilter === 'All' || cat.status === statusFilter;
        const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.description.includes(searchTerm) || String(cat.price).includes(searchTerm) || String(cat.discount_price).includes(searchTerm) || cat.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.category.name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.id.toString().includes(searchTerm);
        return matchesSearch && matchesStatus;
    });

    // Open modal for create
    const openCreateModal = () => {
        reset();
        setImagePreview(null);
        setEditingProducts(null);
        setModalOpen(true);
    }

    // Open modal for edit
    const openEditModal = (product: Products) => {
        setEditingProducts(product);
        setData({
            name: product.name,
            slug: product.slug,
            phone: product.phone,
            image: null,
            description: product.description,
            price: product.price,
            discount_price: product.discount_price,
            status: product.status,
            brand_id: product.brand_id,
            category_id: product.category_id,
            _method: 'PUT',
        });

        setImagePreview(product.image_url);
        setModalOpen(true);
    }

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        //edit
        if (editingProducts) {
            post(route('products.update', editingProducts.id), {
    forceFormData: true,
    
    onSuccess: () => {
      toast.success('Product updated successfully');
        setModalOpen(false);
        reset();
    },
    onError: () => {
      toast.error('Failed to update Product');
    }
});
        } else {
            post(route('products.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Product created successfully');
                    setModalOpen(false);
                    reset();
                },
                onError: () => {
                    toast.error('Failed to create Product');
                }
            });
        }
    }

    
useEffect(() => {
    setTableData(products.data);
}, [products.data]);

useEffect(() => {
    // generate slug from name
    if (data.name) {
        setData('slug', data.name.toLowerCase().replace(/\s+/g, '-'));
    } else {
        setData('slug', '');
    }
}, [data.name, setData]);

  return (
    <AuthenticatedLayout header="Products">
      <Head title="Products" />

      <div className="bg-white p-6 rounded-lg shadow-lg relative z-0">
        {/* Top controls */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          {/* Filters and search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
            <select
              className="border border-gray-300 rounded px-3 py-1 shadow-sm hover:shadow-md transition-all duration-150"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-1 shadow-sm hover:shadow-md transition-all duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Create button */}
          <button
            onClick={openCreateModal}
            className="bg-[var(--primary-color)] text-white px-4 py-2 rounded shadow hover:shadow-lg hover:bg-[var(--secondary-color)] transition-all duration-150"
          >
            Create Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="text-left border-collapse overflow-x-auto">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="cursor-pointer px-4 py-2 border"
                  onClick={() => handleSort('id')}
                >
                  ID {sortField === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="px-4 py-2 border">Image</th>
                <th
                  className="cursor-pointer px-4 py-2 border"
                  onClick={() => handleSort('name')}
                >
                  Product Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border" onClick={() => handleSort('price')}>Price {sortField === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                <th className="px-4 py-2 border" onClick={() => handleSort('discount_price')}>Discount {sortField === 'discount_price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                <th className="px-4 py-2 border" onClick={() => handleSort('brand')}>Brand {sortField === 'brand' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                <th className="px-4 py-2 border" onClick={() => handleSort('category')}>Category {sortField === 'category' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterProducts.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{cat.id}</td>
                  <td className="px-4 py-2 border"><img
  src={cat.image_url}
  alt={cat.name}
  className="w-16 h-16 object-cover rounded"
/></td>
                  <td className="px-4 py-2 border">{cat.name}</td>
                  <td className="px-4 py-2 border">{cat.description}</td>
                  <td className="px-4 py-2 border">{cat.price}</td>
                  <td className="px-4 py-2 border">{cat.discount_price}%</td>
                  <td className="px-4 py-2 border">{cat.brand.name}</td>
                  <td className="px-4 py-2 border">{cat.category.name}</td>
                  
                  <td className="px-4 py-2 border text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        cat.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                
                  <td className="px-4 py-2 border">
                    <div className='h-full flex gap-2 justify-center'>
<button
                      onClick={() => openEditModal(cat)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded shadow hover:shadow-lg hover:bg-blue-600 transition-all duration-150"
                    >
                      Edit
                    </button>
                    <button
                    onClick={() => {
                      if (confirm('Delete this Brands?')) {
                        destroy(route('products.destroy', cat.id), {
                          onSuccess: () => {
                            toast.success('Product deleted successfully');
                          },
                          onError: () => {
                            toast.error('Failed to delete Product');
                          }
                        });
                      }
                    }}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded shadow hover:shadow-lg hover:bg-red-600 transition-all duration-150"
                    >
                      Delete
                    </button>
                    <Link
                      href={route('products.show', cat)}
                      className="px-2 py-1 text-sm bg-gray-500 text-white rounded shadow hover:shadow-lg hover:bg-gray-600 transition-all"
                    >
                      Preview
                    </Link>
                    </div>
                    
                  </td>
                </tr>
              ))}
              {filterProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex gap-2">
  {products.links.map((link, i) => (
    <Link
      key={i}
      href={link.url || '#'}
      dangerouslySetInnerHTML={{ __html: link.label }}
      className={`px-3 py-1 rounded ${
        link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'
      }`}
    />
  ))}
</div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setModalOpen(false)}
            ></div>

            {/* Modal content */}
            <div className="fixed inset-0 top-14 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col relative">
                <div className="border-b pb-3 px-6 pt-4">
                    <h2 className="text-xl font-semibold">
                        {editingProducts ? 'Edit Product' : 'Create Product'}
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className={`w-full border border-gray-300 rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
                      
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label>Slug</label>
                    <input
                      type="text"
                      value={data.slug}
                      onChange={(e) => setData('slug', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Generated from name"
                    />
                  </div>
                  
                    </div>

                    <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      className={`w-full border border-gray-300 rounded px-3 py-2 ${errors.phone ? 'border-red-500' : ''}`}
                      
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Image</label>

                    <label
                        htmlFor="image"
                        className={`relative flex items-center justify-center w-full h-40 ${imagePreview ? 'border-green-500' : 'border-gray-300' } border-2 border-dashed rounded-lg cursor-pointer hover:border-[var(--primary-color)] transition`}
                    >
                        {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="object-cover w-full h-full rounded-lg"
                        />
                        ) : (
                        <div className="text-center text-gray-500">
                            <p className="text-sm">Click to upload</p>
                            <p className="text-xs">PNG, JPG, JPEG</p>
                        </div>
                        )}

                        <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setData('image', file);
                            setImagePreview(URL.createObjectURL(file));
                        }}
                        />
                    </label>
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>
                   <div>
                    <label>Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className={`w-full border rounded ${errors.description ? 'border-red-500' : ''}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                   </div>
                   <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div>
                        <label>Brand</label>
                        <select
                            value={data.brand_id ?? ''}
                            onChange={(e) => setData('brand_id', e.target.value ? Number(e.target.value) : null)}
                            className={`w-full border rounded ${errors.brand_id ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Brand</option>
                            {brands.map((b) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                        {errors.brand_id && <p className="text-red-500 text-sm mt-1">{errors.brand_id}</p>}
                    </div>
                    <div>
                        <label>Category</label>
                        <select
                            value={data.category_id ?? ''}
                            onChange={(e) => setData('category_id', e.target.value ? Number(e.target.value) : null)}
                            className={`w-full border rounded ${errors.category_id ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                    </div>
                   </div>

                   <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', Number(e.target.value))}
                            className={`w-full border rounded ${errors.price ? 'border-red-500' : ''}`}
                            
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>
                    <div>
                    <label>Discount</label>
                    <input
                      type="number"
                      value={data.discount_price ?? ''}
                      onChange={(e) => setData('discount_price', Number(e.target.value))}
                      className={`w-full border rounded ${errors.discount_price ? 'border-red-500' : ''}`}
                      placeholder="Optional"
                    />
                    {errors.discount_price && <p className="text-red-500 text-sm mt-1">{errors.discount_price}</p>}
                  </div>
                  
                   </div>
                   
                    <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={data.status}
                      onChange={(e) => setData({ ...data, status: e.target.value })}
                      className={`w-full border border-gray-300 rounded px-3 py-2 ${errors.status ? 'border-red-500' : ''}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[var(--primary-color)] text-white rounded hover:bg-[var(--secondary-color)] transition-all"
                    >
                      {editingProducts ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
