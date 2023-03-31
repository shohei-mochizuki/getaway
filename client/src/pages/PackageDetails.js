import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// IMPORT useMutation
import { useQuery, useMutation } from "@apollo/client";

// IMPORT AUTH
import Auth from "../utils/auth";


// TEST
import { UPDATE_USER } from "../utils/actions";


import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";

// IMPORT SAVE_FAVOURITE
import { ADD_FAVOURITE } from "../utils/mutations";

import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

import "./assets/css/packageDetails.css";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  // SET MUTATION
  const [addFavourite, { error }] = useMutation(ADD_FAVOURITE);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  // DEFINE saveFavourite handler
  const handleAddFavourite = async () => {
    console.log(currentProduct);

    // Get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addFavourite({
        variables: { _id: currentProduct._id },
      });
      window.location.reload();
      alert("This trip is added to your favourite! Go to My Dashboard!");
      // If book successfully saves to user's account, save book id to state
      // setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

// This function checks whether the user is currently logged in
function isLoggedIn() {
  // It calls the loggedIn method of an object called Auth to determine the user's login status
  return Auth.loggedIn();
}

// This component displays the details of a travel package, including the name, image, destination, description, user rating, departure date, duration, all-inclusive status, and activities. It also displays the price and a button to add the package to the cart. If the user is logged in, it also displays a button to add the package to their favorites. The component uses props to display the details of the current product and includes a Cart component to display the contents of the user's cart.
return (
  <>
    <div className="container text-center">
      <div className="package-details-section">
        <div>
          <div className="package-details-header">
            <h2 style={{ fontWeight: "bold" }}>Package Details</h2>
            <p>{currentProduct.name} | {currentProduct.country}</p>
            <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          </div>
        </div>
        <div className="package-details-info">
          <p>{currentProduct.description}</p>
          <p>User Rating: {currentProduct.rating}</p>
          <p>
            Departure:{" "}
            {new Date(parseInt(currentProduct.departure))
              .toUTCString()
              .slice(0, 16)}
          </p>
          <p>Duration: {currentProduct.duration} days</p>
          {currentProduct.allinclusive ? (
            <p>All-inclusive: Yes</p>
          ) : (
            <p>All-inclusive: No</p>
          )}
          {currentProduct.activities ? (
            <p>Activities: Included</p>
          ) : (
            <p>Activities: Not included</p>
          )}
        </div>
        <div className="action-bg">
          <p className="save-up">save up to {currentProduct.discount}%!</p>
          <p>
            <strong>Price: </strong>
            ${currentProduct.price}
          </p>
          <button className="btn" onClick={addToCart}>
            add to cart
          </button>
          {isLoggedIn() ? (
            <button className="btn" onClick={handleAddFavourite}>
              add to favorite
            </button>
          ) : null}
        </div>
      </div>
    </div>
    <Cart />
  </>
);

}

export default Detail;
