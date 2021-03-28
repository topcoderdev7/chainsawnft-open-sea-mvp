import Countdown from "react-countdown";
import { ensureTwoDigits } from "../../utils/format";

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return "Auction Ended!";
    }
    // Render a countdown
    if (parseInt(days, 10) > 0) {
        return (
            <span>
                {days}d {ensureTwoDigits(hours)}h {ensureTwoDigits(minutes)}min
            </span>
        );
    }

    return (
        <span>
            {ensureTwoDigits(hours)}h {ensureTwoDigits(minutes)}min
            {ensureTwoDigits(seconds)}s
        </span>
    );
};

const CountdownComponent: React.FC<{ date: number }> = ({ date }) => (
    <Countdown date={date} renderer={renderer} />
);

export default CountdownComponent;
