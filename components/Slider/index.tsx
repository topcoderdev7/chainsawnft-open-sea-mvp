import Link from "next/link";
import { Slide } from "../../types";
import styles from "./Slider.module.scss";

const Slider: React.FC<{ slides: Slide[] }> = ({ slides }) => {
    if (!slides.length) {
        return null;
    }

    const slide = slides[0];
    return (
        <div className={styles.slider}>
            <div
                className={styles.bg}
                style={{ backgroundImage: `url(${slide.token.imageUrl})` }}
            />
            <div className={styles.sliderContent}>
                <div className={styles.left}>
                    <h1>{slide.title}</h1>
                </div>
                <div className={styles.right}>
                    <h2>{slide?.token?.artist?.name}</h2>
                    <h3>{slide?.token?.name}</h3>
                    <Link href={`/asset/${slide.token.slug}`}>
                        <button type="button">Bid Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Slider;
