import { useRouter } from "next/router";
import Header from "../Header";
import LandingHeader from "../LandingHeader";
import styles from "./Layout.module.scss";

const Layout: React.FC = ({ children }) => {
    const router = useRouter();
    const isLanding =
        router.pathname.includes("login") ||
        router.pathname.includes("onboarding");
    return (
        <div className={styles.layout}>
            {isLanding && <LandingHeader />}
            {!isLanding && <Header />}

            {children}
        </div>
    );
};

export default Layout;
