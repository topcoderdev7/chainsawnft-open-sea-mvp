import { useRouter } from "next/router";
import Footer from "../Footer";
import Header from "../Header";
import LandingHeader from "../LandingHeader";

const Layout: React.FC = ({ children }) => {
    const router = useRouter();
    const isLanding =
        router.pathname.includes("login") ||
        router.pathname.includes("onboarding");
    return (
        <div>
            {isLanding && <LandingHeader />}
            {!isLanding && <Header />}

            {children}
            <Footer />
        </div>
    );
};

export default Layout;
