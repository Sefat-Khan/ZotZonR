import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

type Brands = {
    id: number;
    name: string;
    color: string;
    status: 'Active' | 'Inactive';
}

interface Pagination <T> {
    data: T[];
    link: any[];
    meta: any[]
}

interface Props {
    brands: Pagination<Brands>;
}

export default function Brands({brands}: Props) {
    const [tableData, setTableData] = useState<Brands[]>(brands.data);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBrands, setEditingBrands] = useState<Brands | null>(null);

    const {data, setData, put, post, delete: destroy, reset, processing, errors} = useForm({
        name: '',
        color: '#732f38',
        status: 'Active',
    });

    const [sortField, setSortField] = useState<'id' | 'name'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Sorting function
    const handleSort = (field: 'id' | 'name') => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sortedData = [...tableData].map((a, b) => {
            if (field === 'id') return order === 'asc' ? a.id - b.id : b.id - a.id;
            return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
        setTableData(sortedData);
    }

    // Filter + search
    const filteredBrands = tableData.filter((cat) => {
        const matchesStatus = statusFilter === 'All' || cat.status === statusFilter;
        const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.id.includes(searchTerm);
        return matchesSearch && matchesStatus;
    });

    // Open modal for create
    const openCreateModal = () => {
        reset();
        setEditingBrands(null);
        setModalOpen(true);
    }

    // Open modal for edit
    const openEditModal = (brands: Brands) => {
        setEditingBrands(brands);
        setData({
            name: brands.name,
            color: brands.color,
            status: brands.status,
        })
        setModalOpen(true);
    };

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //edit
        if (editingBrands) {
            put(route('brands.update', editingBrands.id), {
                onSuccess: () => {
                  toast.success('Brand updated successfully');
                  setModalOpen(false);
                },
                onError: () => {
                  toast.error('Failed to update brand');
                },
                
            });
        } else {
            //create
            post(route('brands.store'), {
                onSuccess: () => {
                  toast.success('Brand created successfully');
                  setModalOpen(false);
                },
                onError: () => {
                  toast.error('Failed to create brand');
                },
            });
        }
    };
    
  return (
    <AuthenticatedLayout header="Brands">
      <Head title="Brands" />

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
            Create Brand
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="cursor-pointer px-4 py-2 border"
                  onClick={() => handleSort('id')}
                >
                  ID {sortField === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  className="cursor-pointer px-4 py-2 border"
                  onClick={() => handleSort('name')}
                >
                  Brand Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="px-4 py-2 border">Color</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{cat.id}</td>
                  <td className="px-4 py-2 border">{cat.name}</td>
                  <td className="px-4 py-2 border flex justify-center items-center gap-2">
                    <span
                      className="inline-block w-6 h-6 rounded-full border"
                      style={{ backgroundColor: cat.color }}
                    ></span>
                    
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        cat.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded shadow hover:shadow-lg hover:bg-blue-600 transition-all duration-150"
                    >
                      Edit
                    </button>
                    <button
                    onClick={() => {
                      if (confirm('Delete this Brands?')) {
                        destroy(route('brands.destroy', cat.id), {
                          onSuccess: () => {
                            toast.success('Brand deleted successfully');
                          },
                          onError: () => {
                            toast.error('Failed to delete brand');
                          },
                        });
                      }
                    }}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded shadow hover:shadow-lg hover:bg-red-600 transition-all duration-150"
                    >
                      Delete
                    </button>
                    <Link
                      href={route('brands.show', cat.id)}
                      className="px-2 py-1 text-sm bg-gray-500 text-white rounded shadow hover:shadow-lg hover:bg-gray-600 transition-all duration-150"
                    >
                      Preview
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredBrands.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex gap-2">
  {brands.links.map((link, i) => (
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
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-xl font-semibold mb-4">
                  {editingBrands ? 'Edit Brand' : 'Create Brand'}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <input
                      type="color"
                      value={data.color}
                      onChange={(e) => setData({ ...data, color: e.target.value })}
                      className={`w-full h-10 border border-gray-300 rounded p-1 ${errors.color ? 'border-red-500' : ''}`}
                    />
                    {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
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
                      {editingBrands ? 'Update' : 'Create'}
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
