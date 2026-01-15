import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Common from '@/Layouts/Common';
import { User, Lock, Trash2, Settings } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;

    const Layout = auth.user?.role === 'admin' ? AuthenticatedLayout : Common;

    return (
        <Layout
            header={
                <div className="flex items-center gap-2">
                    <Settings className="text-gray-400" size={20} />
                    <h2 className="text-xl font-bold leading-tight text-gray-800">Account Settings</h2>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="min-h-screen bg-[#f8fafc] py-12">
                <div className="mx-auto max-w-5xl space-y-8 sm:px-6 lg:px-8">
                    {/* Profile Information Section */}
                    <div className="relative overflow-hidden border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md sm:rounded-3xl">
                        <div className="absolute left-0 top-0 h-full w-1 bg-blue-500"></div>
                        <div className="p-6 sm:p-10">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
                                    <p className="text-sm text-gray-500">Update your account's profile information and email address.</p>
                                </div>
                            </div>
                            <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
                        </div>
                    </div>

                    {/* Password Update Section */}
                    <div className="relative overflow-hidden border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md sm:rounded-3xl">
                        <div className="absolute left-0 top-0 h-full w-1 bg-amber-500"></div>
                        <div className="p-6 sm:p-10">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Security</h3>
                                    <p className="text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
                                </div>
                            </div>
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Delete Account Section */}
                    <div className="relative overflow-hidden border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md sm:rounded-3xl">
                        <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>
                        <div className="p-6 sm:p-10">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                                    <Trash2 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Danger Zone</h3>
                                    <p className="text-sm text-gray-500">Permanently delete your account and all associated data.</p>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}