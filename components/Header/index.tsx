import Link from "next/link";
import Signup from "../Signup";

const Header: React.FC = () => (
    <div>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Signup />
    </div>
);

export default Header;
