import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

type Logo = {
    id: number;
    image: string;
    image_url: string;
};

interface ImageAddProps {
    logo: Logo | null;
}

export default function ImageAdd({ logo }: ImageAddProps) {
    const [preview, setPreview] = useState<string | null>(
        logo?.image_url ?? null
    );

    const { data, setData, reset, post, put, processing, errors } = useForm<{
        image: File | null;
    }>({
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.image && !logo) {
            toast.error('Please select an image');
            return;
        }

        if (logo) {
            put(route('logo.update', logo.id), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Logo updated!');
                    reset();
                },
                onError: () => {
                    toast.error('Update failed');
                },
            });
        } else {
            post(route('logo.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Logo created!');
                    reset();
                    
                },
                onError: () => {
                    toast.error('Upload failed');
                },
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setData('image', file);
        setPreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setData('image', null);
        setPreview(null);
    };

    return (
        <AuthenticatedLayout header="Logo Settings">
            <Head title="Logo" />

            <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
                <h2 className="mb-4 text-xl font-black uppercase italic tracking-tighter text-gray-900">
                    Upload / Update Image
                </h2>

                <div className="space-y-4">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        <ImageIcon size={14} /> Logo Image
                    </span>

                    <label className="group relative flex h-56 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-gray-100 hover:bg-gray-50">
                        {preview ? (
                            <>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="absolute inset-0 h-full w-full object-cover opacity-30"
                                />

                                <div className="relative z-10 flex flex-col items-center">
                                    <UploadCloud className="mb-2 text-gray-900" />
                                    <span className="text-xs font-black uppercase italic tracking-tighter">
                                        Replace Image
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 shadow hover:bg-red-50 hover:text-red-600"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center">
                                <UploadCloud
                                    className="mb-3 text-gray-300 group-hover:text-gray-900"
                                    size={36}
                                />
                                <span className="text-xs font-black uppercase italic tracking-tighter text-gray-400">
                                    Click to Upload Image
                                </span>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>

                    {data.image && (
                        <p className="text-center text-xs font-bold uppercase text-emerald-500">
                            Selected: {data.image.name}
                        </p>
                    )}

                    {errors.image && (
                        <p className="text-center text-xs text-red-500">
                            {errors.image}
                        </p>
                    )}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="rounded-2xl bg-gray-900 px-8 py-3 font-black uppercase italic tracking-tighter text-white hover:bg-[var(--primary-color)] disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Image'}
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
