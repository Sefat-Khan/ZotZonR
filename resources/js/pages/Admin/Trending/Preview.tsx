import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Props {
  trending: {
    id: number;
    name: string;
    slug: string;
    description: string;
    discount: number;
    status: 'Active' | 'Inactive';
    image_url: string;
    created_at: string;
  };
}

export default function Preview({ trending }: Props) {
  return (
    <AuthenticatedLayout header="Trending Preview">
      <Head title={trending.name} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {trending.name}
            </h1>
            <p className="text-sm text-gray-500">
              Trending ID #{trending.id} · Created {trending.created_at}
            </p>
          </div>

          <Link
            href={route('trendings.index')}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium"
          >
            ← Back to Trendings
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 lg:p-10">
            {/* Image */}
            <div className="relative">
              <span
                className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full text-white ${
                  trending.status === 'Active'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              >
                {trending.status}
              </span>

              <img
                src={trending.image_url}
                alt={trending.name}
                className="w-full h-[300px] sm:h-[420px] object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Discount */}
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Discount
                </span>
                <div className="text-4xl font-bold text-red-500">
                  {trending.discount || 0}%
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info label="Slug" value={trending.slug} />
                <Info label="Status" value={trending.status} />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {trending.description || 'No description provided.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Link
                  href={route('trendings.edit', trending.id)}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                >
                  Edit
                </Link>

                <Link
                  href={route('trendings.index')}
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
    <div className="bg-gray-50 border rounded-lg p-4">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="font-semibold text-gray-800 break-words">
        {value}
      </p>
    </div>
  );
}
