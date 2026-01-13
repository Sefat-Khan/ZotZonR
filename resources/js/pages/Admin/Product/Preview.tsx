import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Props {
  product: {
    id: number;
    name: string;
    slug: string;
    phone: string;
    description: string;
    price: number;
    discount_price: number;
    status: string;
    image_url: string;
    brand: { id: number; name: string };
    category: { id: number; name: string };
    created_at: string;
  };
}

export default function Preview({ product }: Props) {
  const finalPrice =
    product.discount_price > 0
      ? product.price - (product.price * product.discount_price) / 100
      : product.price;

  return (
    <AuthenticatedLayout header="Product Preview">
      <Head title={product.name} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500">
              Product ID #{product.id} · Created {product.created_at}
            </p>
          </div>

          <Link
            href={route('products.index')}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium"
          >
            ← Back to Products
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
                    product.status === 'Active'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-[320px] sm:h-[420px] object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              {/* Price */}
              <div>
                {product.discount_price > 0 ? (
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-green-600">
                      ${finalPrice.toFixed(2)}
                    </span>
                    <span className="text-lg line-through text-gray-400">
                      ${product.price}
                    </span>
                    <span className="text-sm font-semibold text-red-500">
                      -{product.discount_price}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem label="Brand" value={product.brand.name} />
                <InfoItem label="Category" value={product.category.name} />
                <InfoItem label="Slug" value={product.slug} />
                <InfoItem label="Phone" value={product.phone} />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'No description provided.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href={route('products.edit', product.id)}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                >
                  Edit Product
                </Link>

                <Link
                  href={route('products.index')}
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

/* Small reusable component */
function InfoItem({ label, value }: { label: string; value: string }) {
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
