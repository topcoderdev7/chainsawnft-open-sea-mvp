import Loading from "../Loading";
import Modal from "../Modal";

const LoadingModal: React.FC = () => (
    <Modal handleClose={() => null}>
        <div>
            <h2>Loading</h2>
            <Loading message="Sending your Buy Order" />
        </div>
    </Modal>
);

export default LoadingModal;
