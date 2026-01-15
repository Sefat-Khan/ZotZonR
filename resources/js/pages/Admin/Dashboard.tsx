import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Tag, Layers, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function Dashboard() {
    const { products, brands, categories } = usePage().props;

    const recentCategories = [...categories].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
    const recentProducts = [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

    const categoriesData = categories.map((cat) => ({
        name: cat.name,
        value: products.filter((p) => p.category_id === cat.id).length,
        color: cat.color || '#8884d8',
    }));

    const brandsData = brands.map((b) => ({
        name: b.name,
        value: products.filter((p) => p.brand_id === b.id).length,
        color: b.color || '#82ca9d',
    }));

    return (
        <AuthenticatedLayout header="System Overview">
            <Head title="Dashboard" />

            <div className="mx-auto max-w-[1600px] space-y-8 px-4 py-6 sm:px-6 lg:px-8">
                {/* STATS GRID */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: 'Categories', value: categories.length, icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Brands', value: brands.length, icon: Tag, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'Total Products', value: products.length, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
                        {
                            label: 'Active Status',
                            value: products.filter((p) => p.status === 'Active').length,
                            icon: CheckCircle,
                            color: 'text-emerald-600',
                            bg: 'bg-emerald-50',
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-5 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className={`${stat.bg} ${stat.color} rounded-2xl p-4`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                                <h4 className="text-3xl font-black italic tracking-tighter text-gray-900">{stat.value}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CHARTS SECTION */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Category Chart */}
                    <div className="flex h-[500px] flex-col rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-gray-400">
                            <div className="h-2 w-2 rounded-full bg-[var(--primary-color)]" /> Distribution by Category
                        </h3>
                        <div className="min-h-0 flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={categoriesData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
                                        {categoriesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend
                                        layout="vertical"
                                        align="right"
                                        verticalAlign="middle"
                                        iconType="circle"
                                        wrapperStyle={{
                                            paddingLeft: '20px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            overflowY: 'auto',
                                            maxHeight: '300px',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Brand Chart - FIXED HEIGHT & SCROLLABLE LEGEND */}
                    <div className="flex h-[500px] flex-col rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-gray-400">
                            <div className="h-2 w-2 rounded-full bg-[var(--secondary-color)]" /> Market Share by Brand
                        </h3>
                        <div className="min-h-0 flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={brandsData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
                                        {brandsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend
                                        layout="vertical"
                                        align="right"
                                        verticalAlign="middle"
                                        iconType="circle"
                                        // This wrapperStyle is key: it limits legend height and allows scrolling
                                        wrapperStyle={{
                                            paddingLeft: '20px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            overflowY: 'auto',
                                            maxHeight: '350px',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RECENT ACTIVITY TABLES */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Recent Categories */}
                    <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm lg:col-span-1">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">New Categories</h3>
                            <Clock size={16} className="text-gray-300" />
                        </div>
                        <div className="space-y-3">
                            {recentCategories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="group flex items-center justify-between rounded-2xl bg-gray-50 p-4 transition-all duration-300 hover:bg-[var(--primary-color)]"
                                >
                                    <span className="font-bold text-gray-700 group-hover:text-white">{cat.name}</span>
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white/60">
                                        {new Date(cat.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Products Table */}
                    <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Latest Product Entries</h3>
                            <button className="flex items-center gap-1 text-[10px] font-black uppercase text-[var(--primary-color)] hover:underline">
                                View Inventory <ArrowRight size={12} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <th className="px-2 pb-4">Product Name</th>
                                        <th className="px-2 pb-4">Price</th>
                                        <th className="px-2 pb-4">Date</th>
                                        <th className="px-2 pb-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentProducts.map((prod) => (
                                        <tr key={prod.id} className="group transition-colors hover:bg-gray-50">
                                            <td className="px-2 py-4 font-bold text-gray-700">{prod.name}</td>
                                            <td className="px-2 py-4 font-medium text-gray-500">৳{prod.final_price}</td>
                                            <td className="px-2 py-4 text-xs text-gray-400">{new Date(prod.created_at).toLocaleDateString()}</td>
                                            <td className="px-2 py-4 text-right">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-[9px] font-black uppercase ${prod.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}
                                                >
                                                    {prod.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}