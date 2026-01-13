import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Orders = {
    id: number;
    name: string;
    product_id: number;
    slug: string;
    image: string | null;
    image_url: string;
    shipping_address: string;
    user_id: number | null;
    phone: string;
    total_price: number;
    payment_info: 'Paid' | 'Unpaid';
    order_status: 'Processing' | 'Shipped' | 'Complete';
    status: 'Active' | 'Inactive';
}

interface Pagination<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface Props {
    orders: Pagination<Orders>;
}

export default function Orders({orders}: Props) {
    const [tableData, setTableData] = useState<Orders[]>(orders.data);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOrders, setEditingOrders] = useState<Orders | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [slug, setSlug] = useState('');


    const {data, setData, post, delete: destroy, processing, reset, errors} = useForm({
        name: '',
        product_id: 1,
        slug: '',
        image: null as File | null,
        shipping_address: '',
        user_id: null as number | null,
        phone: '',
        total_price: 0,
        payment_info: 'All' as 'Unpaid' | 'Paid',
        order_status: 'All' as 'Processing' | 'Shipped' | 'Complete',
        status: 'Active' as 'Active' | 'Inactive',
        _method: 'POST',
    });

    const [sortField, setSortField] = useState<'id' | 'name' | 'product_id' | 'user_id' | 'total_price'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
    const [paymentInfoFilter, setPaymentInfoFilter] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Sorting function
    const handleSort = (field: 'id' | 'name' | 'product_id' | 'user_id' | 'total_price') => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sortedData = [...tableData].sort((a , b) => {
            if (field === 'id') return order === 'asc' ? a.id - b.id : b.id - a.id;
            if (field === 'name') return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            if (field === 'product_id') return order === 'asc' ? a.product_id - b.product_id : b.product_id - a.product_id;
            if (field === 'user_id') return order === 'asc' ? a.user_id - b.user_id : b.user_id - a.user_id;
            if (field === 'total_price') return order === 'asc' ? a.total_price - b.total_price : b.total_price - a.total_price;

        });
        setTableData(sortedData);
    }

    // Filter + search
const filterOrders = tableData.filter((order) => {
    const matchesStatus =
        statusFilter === 'All' || order.status === statusFilter;

    const matchesOrderStatus =
        orderStatusFilter === 'All' || order.order_status.toLocaleLowerCase() === orderStatusFilter.toLocaleLowerCase();

    const matchesPaymentInfo =
        paymentInfoFilter === 'All' || order.payment_info === paymentInfoFilter;

    const matchesSearch =
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm) ||
        order.product_id.toString().includes(searchTerm) ||
        order.user_id.toString().includes(searchTerm);

    return (
        matchesStatus &&
        matchesOrderStatus &&
        matchesPaymentInfo &&
        matchesSearch
    );
});


    // Open modal for create
    // const openCreateModal = () => {
    //     reset();
    //     setImagePreview(null);
    //     setEditingOrders(null);
    //     setModalOpen(true);
    // }

    // Open modal for edit
    const openEditModal = (order: Orders) => {
        setEditingOrders(order);
        setData({
            name: order.name,
            product_id: order.product_id,
            slug: order.slug,
            image: null,
            shipping_address: order.shipping_address,
            user_id: order.user_id,
            phone: order.phone,
            total_price: order.total_price,
            payment_info: order.payment_info,
            order_status: order.order_status,
            status: order.status,
            _method: 'PUT',
        });

        setImagePreview(order.image_url);
        setModalOpen(true);
    }

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        //edit
        if (editingOrders) {
            post(route('orders.update', editingOrders.id), {
    forceFormData: true,
    
    onSuccess: () => {
        toast.success('Order updated successfully');
        setModalOpen(false);
        reset();
    },
    onError: () => {
        toast.error('Failed to update order. Please check the form for errors.');
    }
});
        } 
        // else {
        //     post(route('trendings.store'), {
        //         forceFormData: true,
        //         onSuccess: () => {
        //             setModalOpen(false);
        //             reset();
        //         },
        //     });
        // }
    }

    
useEffect(() => {
    setTableData(orders.data);
}, [orders.data]);

useEffect(() => {
    // generate slug from name
    if (data.name) {
        setData('slug', data.name.toLowerCase().replace(/\s+/g, '-'));
    } else {
        setData('slug', '');
    }
}, [data.name, setData]);

  return (
    <AuthenticatedLayout header="orders">
      <Head title="Orders" />

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

            <select
              className="border border-gray-300 rounded px-3 py-1 shadow-sm hover:shadow-md transition-all duration-150"
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Complete">Complete</option>
            </select>

            <select
              className="border border-gray-300 rounded px-3 py-1 shadow-sm hover:shadow-md transition-all duration-150"
              value={paymentInfoFilter}
              onChange={(e) => setPaymentInfoFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          {/* Create button */}
          {/* <button
            onClick={openCreateModal}
            className="bg-[var(--primary-color)] text-white px-4 py-2 rounded shadow hover:shadow-lg hover:bg-[var(--secondary-color)] transition-all duration-150"
          >
            Create Product
          </button> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="text-left border-collapse overflow-x-auto lg:w-full">
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
                  Order Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  className="cursor-pointer px-4 py-2 border"
                  onClick={() => handleSort('product_id')}
                >
                 Product ID {sortField === 'product_id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  className="cursor-pointer px-4 py-2 border"
                  onClick={() => handleSort('user_id')}
                >
                 User ID {sortField === 'user_id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  className="cursor-pointer px-4 py-2 border"
                  onClick={() => handleSort('total_price')}
                >
                 Total Price {sortField === 'total_price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Shipping Address</th>
                <th className="px-4 py-2 border">Payment Info</th>
                <th className="px-4 py-2 border">Order Status</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterOrders.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{cat.id}</td>
                  <td className="px-4 py-2 border"><img
  src={cat.image_url}
  alt={cat.name}
  className="w-16 h-16 object-cover rounded"
/></td>
                  <td className="px-4 py-2 border">{cat.name}</td>
                  <td className="px-4 py-2 border">{cat.product_id}</td>
                  <td className="px-4 py-2 border">{cat.user_id}</td>
                  <td className="px-4 py-2 border">{cat.total_price}</td>
                  <td className="px-4 py-2 border">{cat.phone}</td>
                  <td className="px-4 py-2 border">{cat.shipping_address}</td>
                  <td className="px-4 py-2 border text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        cat.payment_info === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {cat.payment_info}
                    </span>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        cat.order_status.toLocaleLowerCase() === 'complete'
                          ? 'bg-green-500'
                          : cat.order_status.toLocaleLowerCase() === 'processing'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                    >
                      {cat.order_status}
                    </span>
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
                        destroy(route('orders.destroy', cat.id));
                      }
                    }}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded shadow hover:shadow-lg hover:bg-red-600 transition-all duration-150"
                    >
                      Delete
                    </button>
                    <Link
                      href={route('orders.show', cat.id)}
                      className="px-2 py-1 text-sm bg-gray-500 text-white rounded shadow hover:shadow-lg hover:bg-gray-600 transition-all duration-150"
                    >
                      Preview
                    </Link>
                    </div>
                    
                  </td>
                </tr>
              ))}
              {filterOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex gap-2">
  {orders.links.map((link, i) => (
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
                        {editingOrders ? 'Edit Product' : 'Create Product'}
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
                      className={`w-full border rounded px-3 py-2 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                              }`}
                      
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
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
                    <label className="block text-sm font-medium mb-2">Product Image</label>

                    <label
                        htmlFor="image"
                        className={`relative flex items-center justify-center w-full h-40 ${imagePreview ? 'bg-gray-100' : 'bg-gray-50'} border-2 border-dashed rounded-lg cursor-pointer hover:border-[var(--primary-color)] transition`}
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
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                    )}
                </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      className={`w-full border rounded px-3 py-2${errors.phone ? ' border-red-500' : ' border-gray-300'}`}
                      
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Shipping Address</label>
                    <textarea
                      value={data.shipping_address}
                      onChange={(e) => setData('shipping_address', e.target.value)}
                      className={`w-full border rounded px-3 py-2${errors.shipping_address ? ' border-red-500' : ' border-gray-300'}`}
                      
                    />
                    {errors.shipping_address && (
                        <p className="text-red-500 text-xs mt-1">{errors.shipping_address}</p>
                      )}
                  </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label>Total Price</label>
                      <input
                        type="number"
                        value={data.total_price}
                        onChange={(e) => setData('total_price', Number(e.target.value))}
                        className={`w-full border rounded px-3 py-2${errors.total_price ? ' border-red-500' : ' border-gray-300'}`}
                      />
                      {errors.total_price && (
                        <p className="text-red-500 text-xs mt-1">{errors.total_price}</p>
                      )}
                    </div>

                    <div>
                      <label>Payment Info</label>
                      <select
                        value={data.payment_info}
                        onChange={(e) => setData('payment_info', e.target.value as any)}
                        className={`w-full border rounded px-3 py-2${errors.payment_info ? ' border-red-500' : ' border-gray-300'}`}
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                      </select>
                      {errors.payment_info && (
                        <p className="text-red-500 text-xs mt-1">{errors.payment_info}</p>
                      )}
                    </div>
                  </div>


                   <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    
                    <div>
                    <label>Order Status</label>
                    <select
                      value={data.order_status}
                      onChange={(e) => setData('order_status', e.target.value as any)}
                      className={`w-full border rounded px-3 py-2${errors.order_status ? ' border-red-500' : ' border-gray-300'}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Complete">Complete</option>
                    </select>
                    {errors.order_status && (
                        <p className="text-red-500 text-xs mt-1">{errors.order_status}</p>
                      )}
                  </div>
                    
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={data.status}
                      onChange={(e) => setData({ ...data, status: e.target.value })}
                      className={`w-full border border-gray-300 rounded px-3 py-2${errors.status ? ' border-red-500' : ' border-gray-300'}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                    )}
                  </div>
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
                      {editingOrders ? 'Update' : 'Create'}
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
