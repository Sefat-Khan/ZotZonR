import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-bold text-gray-900">Delete Account</h2>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please
                    download any data or information that you wish to retain.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="inline-flex items-center rounded-xl border border-transparent bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm shadow-red-100 transition-all duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-900"
            >
                Delete Account
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8">
                    <div className="mb-4 flex items-center gap-3 text-red-600">
                        <div className="rounded-lg bg-red-50 p-2">
                            <AlertTriangle size={24} />
                        </div>
                        <h2 className="text-xl font-black tracking-tight text-gray-900">Confirm Deletion</h2>
                    </div>

                    <p className="text-sm leading-relaxed text-gray-500">
                        Are you absolutely sure? This action cannot be undone. Please enter your password to confirm you would like to permanently
                        delete your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500 sm:w-3/4"
                            isFocused
                            placeholder="Enter password to confirm"
                        />

                        <InputError message={errors.password} className="mt-2 text-xs font-bold" />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="rounded-xl border-gray-200 px-6 py-3 font-bold">
                            Keep Account
                        </SecondaryButton>

                        <DangerButton className="rounded-xl px-6 py-3 font-bold shadow-lg shadow-red-100" disabled={processing}>
                            Delete Permanently
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}