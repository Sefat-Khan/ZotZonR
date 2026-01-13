import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Preview() {
  const { order } = usePage().props;

  return (
    <AuthenticatedLayout header="Order Preview">
      <Head title={`Order - ${order.name}`} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {order.name}
            </h1>
            <p className="text-sm text-gray-500">
              Order #{order.id} · Created {order.created_at}
            </p>
          </div>

          <Link
            href={route('orders.index')}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium"
          >
            ← Back to Orders
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 lg:p-10">
            
            {/* Image Section */}
            <div className="relative">
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                    order.status === 'Active'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <img
                src={order.image_url}
                alt={order.name}
                className="w-full h-[320px] sm:h-[420px] object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              {/* Price */}
              <div>
                <span className="text-3xl font-bold text-green-600">
                  ৳ {order.total_price}
                </span>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem label="Customer Name" value={order.name} />
                <InfoItem label="Phone" value={order.phone} />
                <InfoItem label="Payment" value={order.payment_info} />
                <InfoItem label="Order Status" value={order.order_status} />
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Shipping Address
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {order.shipping_address}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href={route('orders.index')}
                  className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition font-medium"
                >
                  Back
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

/* Reusable component */
function InfoItem({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="font-semibold text-gray-800 break-words">
        {value}
      </p>
    </div>
  );
}
