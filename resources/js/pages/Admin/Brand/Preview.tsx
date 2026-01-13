import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Props {
  brand: {
    id: number;
    name: string;
    color: string;
    status: 'Active' | 'Inactive';
    created_at: string;
    updated_at: string;
  };
}

export default function Preview({ brand }: Props) {
  return (
    <AuthenticatedLayout header="Brand Preview">
      <Head title={`Brand • ${brand.name}`} />

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {brand.name}
            </h1>
            <p className="text-sm text-gray-500">
              Brand ID #{brand.id}
            </p>
          </div>

          <Link
            href={route('brands.index')}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium"
          >
            ← Back to Brands
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
            
            {/* Left Side */}
            <div className="space-y-6">
              {/* Color Preview */}
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                  Brand Color
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-xl shadow-inner border"
                    style={{ backgroundColor: brand.color }}
                  />
                  <span className="font-mono text-lg text-gray-700">
                    {brand.color}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                  Status
                </p>
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold text-white ${
                    brand.status === 'Active'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {brand.status}
                </span>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              <Info label="Brand Name" value={brand.name} />
              <Info label="Created At" value={brand.created_at} />
              <Info label="Last Updated" value={brand.updated_at} />

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Link
                  href={route('brands.edit', brand.id)}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                >
                  Edit Brand
                </Link>

                <Link
                  href={route('brands.index')}
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

/* Reusable Info Card */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 border rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
        {label}
      </p>
      <p className="font-semibold text-gray-800 break-words">
        {value}
      </p>
    </div>
  );
}
