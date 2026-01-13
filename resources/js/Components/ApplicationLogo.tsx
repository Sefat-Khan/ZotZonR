import logo from '../../../public/images/logo.png';
export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="FastCart" {...props} />
    );
}
