import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import Shimmer from "./Shimmer";

const RestaurantMenu = () =>{
    //How to read a dynamic URL params
   const params = useParams();
   const { id } = params;

   const [restaurant, setRestaurant] = useState(null);
//Calling the API 
   useEffect(() => {
      getRestaurantInfo();
   },[]);

   async function getRestaurantInfo(){
    const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=" + id);
    const json = await data.json();
    console.log(json.data);
    setRestaurant(json.data);
   }

   if(!restaurant) {}

    return(!restaurant)?<Shimmer />:(
        <div className="menu">
            <div>
                <h1>Restaurant id: {id}</h1>
                <h2>{restaurant?.name}</h2>
                <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId}></img>
                <h3>{restaurant?.area}</h3>
                <h3>{restaurant?.city}</h3>
                <h3>{restaurant?.avgRating} stars</h3>
                <h3>{restaurant.costForTwoMsg}</h3>
            </div>
            <div>
                <h1>Menu</h1>
                <ul>
                    {Object.values(restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards).map((item) => {

                        if ("itemCards" in item?.card?.card) {
                            console.log(item?.card?.card?.title);
                            return (
                                <div><li>{item?.card?.card?.title}</li>
                                    {
                                        Object.values(item?.card?.card?.itemCards).map((element) => {
                                            return <li key={element?.card?.info?.id}>
                                                {element?.card?.info?.name}{" "}
                                            </li>
                                        })
                                    }
                                </div>
                            );
                        }

                    })}
                </ul>
            </div>
        </div>
    );
};

export default RestaurantMenu;