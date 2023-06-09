import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import { Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

  const handleCancel = () => {

  }


  return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="mb-4 text-sm text-gray-600">
            Mot de passe oublié? Aucun problème. Indiquez-nous simplement votre adresse e-mail et nous vous enverrons
            par e-mail un lien de réinitialisation de mot de passe qui vous permettra d'en choisir un nouveau.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2 text-sm text-black" />

                <div className="flex items-center justify-between mt-4">
                    <SecondaryButton disabled={false} onClick={handleCancel}>
                      <Link replace href="/login">Retour</Link>
                    </SecondaryButton>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Réinitialiser le mot de passe
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
