import Modal from "../Modal";

const LoadingModal: React.FC = () => (
    <Modal handleClose={() => null}>
        <div>
            <img src="/images/loading-black.svg" alt="Loading" />
            <h2>Loading</h2>
            <p>Sending your Buy Order</p>
        </div>
    </Modal>
);

export default LoadingModal;
