import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Mail } from 'lucide-react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">Update your account's profile information and email address.</p>
            </header>

            <form onSubmit={submit} className="mt-8 space-y-6">
                <div className="space-y-1">
                    <InputLabel htmlFor="name" value="Full Name" className="text-xs font-bold uppercase tracking-wider text-gray-400" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-black focus:ring-black"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        placeholder="Your full name"
                    />

                    <InputError className="mt-2 text-xs font-bold" message={errors.name} />
                </div>

                <div className="space-y-1">
                    <InputLabel htmlFor="email" value="Email Address" className="text-xs font-bold uppercase tracking-wider text-gray-400" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-black focus:ring-black"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="email@example.com"
                    />

                    <InputError className="mt-2 text-xs font-bold" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                        <p className="flex items-center gap-2 text-sm text-amber-800">
                            <Mail size={16} />
                            Your email address is unverified.
                        </p>

                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="mt-2 inline-flex text-xs font-bold uppercase tracking-tighter text-amber-900 underline hover:no-underline focus:outline-none"
                        >
                            Click here to re-send the verification email.
                        </Link>

                        {status === 'verification-link-sent' && (
                            <div className="mt-3 w-fit rounded-lg bg-white/50 px-2 py-1 text-xs font-bold text-emerald-600">
                                A new verification link has been sent.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        disabled={processing}
                        className="rounded-xl bg-black px-8 py-3 text-sm font-bold text-white shadow-xl shadow-gray-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                        Save Profile
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-600">
                            <CheckCircle2 size={16} />
                            Saved Successfully
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}