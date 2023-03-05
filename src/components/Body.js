
import { restaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from './Shimmer';
import { Link } from "react-router-dom";


function filterData(searchText, restaurants) {
    const filterData = restaurants.filter((restaurant) =>
        restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
    );
    return filterData;
}



const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getRestaurants();
    }, []);

    

    async function getRestaurants() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        
        setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    }
    
    console.log("render");

    //not render component (Early return)
    if (!allRestaurants) return null;
    
    // if (filteredRestaurants?.length === 0)
    //    return <h1>No Restaurant match your Filter!!</h1>;

    return allRestaurants?.length === 0 ? (
        <Shimmer />
    ) : (
        <>
            <div className="search-container">
                <input type="text"
                    className="search-input"
                    placeholder="search"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />

                <button className="search-btn"
                    onClick={() => {
                        //need to filter the Data
                        const data = filterData(searchText, allRestaurants);
                        //update the state - restaurants
                        setFilteredRestaurants(data);
                    }}
                >
                    search
                </button>
            </div>



            <div className="restaurant-list">
                {filteredRestaurants.map((restaurant) => {
                    return(
                    <Link to = {"/restaurant/" + restaurant.data.id} key={restaurant.data.id} > <RestaurantCard {...restaurant.data} />
                    </Link>
                    );
                })}
            </div>
        </>
    );
}

export default Body;  
