const Asset: React.FC<{
    description: string;
    imageUrl: string;
    name: string;
}> = ({ description, imageUrl, name }) => (
    <div>
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
    </div>
);

export default Asset;
