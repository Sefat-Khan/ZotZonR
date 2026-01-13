import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const {products, brands, categories} = usePage().props;

    const recentCategories = [...categories].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

    const recentBrands = [...brands].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

    const recentProducts = [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

    const categoriesData = categories.map(cat => ({
        name: cat.name,
        value: products.filter(p => p.category_id === cat.id).length,
        color: cat.color,
    }),);

    const brandsData = brands.map(b => ({
        name: b.name,
        value: products.filter(p => p.brand_id === b.id).length,
        color: b.color,
    }),);

    return (
        <AuthenticatedLayout
            header="Dashboard"
        >
            <Head title="Dashboard" />

            {/* Stats Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-[var(--primary-color)]">Categories</h3>
                    <span className="mt-2 text-3xl font-bold text-gray-800">{categories.length}</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-[var(--primary-color)]">Brands</h3>
                    <span className="mt-2 text-3xl font-bold text-gray-800">{brands.length}</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-[var(--primary-color)]">Products</h3>
                    <span className="mt-2 text-3xl font-bold text-gray-800">{products.length}</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-[var(--primary-color)]">Active Products</h3>
                    <span className="mt-2 text-3xl font-bold text-gray-800">{products.filter(p => p.status === 'Active').length}</span>
                </div>
            </div>

            {/* Pie Chart */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-4">Products by Category</h3>
                <div className="w-full h-[350px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={categoriesData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {categoriesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-4">Products by Category</h3>
                <div className="w-full h-[350px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={brandsData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {brandsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            </div>
            

            {/* Recent Categories & Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Categories */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-4">Recently Added Categories</h3>
                    <ul className="space-y-2">
                        {recentCategories.map(cat => (
                            <li key={cat.id} className="p-2 border rounded hover:bg-[var(--primary-color)] hover:text-white transition">
                                {cat.name} - <span className="text-gray-500 text-sm">{new Date(cat.created_at).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent brands */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-4">Recently Added Categories</h3>
                    <ul className="space-y-2">
                        {recentBrands.map(cat => (
                            <li key={cat.id} className="p-2 border rounded hover:bg-[var(--primary-color)] hover:text-white transition">
                                {cat.name} - <span className="text-gray-500 text-sm">{new Date(cat.created_at).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                
            </div>
            {/* Recent Products */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                    <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-4">Recently Added Products</h3>
                    <ul className="space-y-2">
                        {recentProducts.map(prod => (
                            <li key={prod.id} className="p-2 border rounded hover:bg-[var(--primary-color)] hover:text-white transition">
                                {prod.name} - <span className="text-gray-500 text-sm">{new Date(prod.created_at).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
        </AuthenticatedLayout>
    );
}
