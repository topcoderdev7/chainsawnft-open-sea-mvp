import { utils } from "ethers";
import useOrders from "../../hooks/useOrders";

const Orders: React.FC<{ address: string; tokenId: string }> = ({
    address,
    tokenId,
}) => {
    const { buyOrders, sellOrders, owner } = useOrders(address, tokenId);
    return (
        <div>
            <h3>List of orders</h3>
            {owner ? <p>Owned by {owner.address}</p> : ""}
            <h4>Buy Orders</h4>
            {buyOrders.map((buyOrder) => (
                <p>Ξ{utils.formatEther(buyOrder.basePrice.toString())}</p>
            ))}

            <h4>Sell Orders</h4>
            {sellOrders.map((sellOrder) => (
                <p>Ξ{utils.formatEther(sellOrder.basePrice.toString())}</p>
            ))}
        </div>
    );
};

export default Orders;
