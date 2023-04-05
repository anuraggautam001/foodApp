import { IMG_CDN_URL } from "../config";

const RestaurantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  costForTwoString,
}) => {
  return (
    //Card layout
    <div className="card">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <h2>{name}</h2>
      <h5>{cuisines.join(", ")}</h5>
      <p>{costForTwoString}</p>
    </div>
  );
};

export default RestaurantCard;