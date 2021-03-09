import Link from "next/link";
import Signup from "../Signup";

const Header: React.FC = () => (
    <div>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Signup />
        <Link href="/deposit">Deposit ETH / WETH</Link>
    </div>
);

export default Header;
