import React from "react";
import { useSelector } from "react-redux";
import Carts from "../../components/Carts/Carts";

const Favorites = () => {
  const { filmsList } = useSelector((state) => state.favorite);

  return (
    <div>
      <h1 className="favorites-heading">Favorites Films</h1>
      <div className="film-carts">
        {filmsList?.map((item) => {
          return (
            <div key={item.id} className="cart-div">
              <Carts {...item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
