import { Head, Link } from '@inertiajs/react';
import CommonLayout from '@/Layouts/Common';
import Hero from "../Components/Hero";
import Feature from "../Components/Feature";
import Offer from "../Components/Offer";
import NewArrival from "../Components/NewArrival";
import New from "../Components/New";
import Best from "../Components/Best";
import SpecialOffer from "../Components/SpecialOffer";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <CommonLayout header="Welcome">
                <Head title="Welcome" />
                <div>
                    <Hero />
                          {/* <Feature /> */}
                          <Offer />
                          <NewArrival />
                          <New />
                          <Best />
                          <SpecialOffer />
                </div>

            </CommonLayout>
        </>
    );
}
