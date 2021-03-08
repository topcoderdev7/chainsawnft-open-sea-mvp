import Link from "next/link";
import Signup from "../Signup";
import WethManager from "../WethManager";

const Header: React.FC = () => (
    <div>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Signup />
        <WethManager />
    </div>
);

export default Header;
