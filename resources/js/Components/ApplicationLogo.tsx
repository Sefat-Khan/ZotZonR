import { usePage } from '@inertiajs/react';
import localLogo from '../../../public/images/logo.png';
export default function ApplicationLogo(props) {
    const { logo } = usePage().props;

    return <img src={logo ? logo.image_url : localLogo} alt="FastCart" {...props} />;
}
