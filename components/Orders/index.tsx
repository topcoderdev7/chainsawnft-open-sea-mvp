import useOrders from "../../hooks/useOrders";

const Orders: React.FC<{ address: string; id: string }> = ({ address, id }) => {
    console.log("address", address);
    console.log("id", id);
    const { buyOrders, sellOrders } = useOrders(address, id);
    return (
        <div>
            <h3>List of orders</h3>
            <h4>Buy Orders</h4>
            {buyOrders.map((buyOrder) => (
                <p>${buyOrder.paymentTokenContract.usdPrice}</p>
            ))}

            <h4>Sell Orders</h4>
            {sellOrders.map((sellOrder) => (
                <p>${sellOrder.paymentTokenContract.usdPrice}</p>
            ))}
        </div>
    );
};

export default Orders;
