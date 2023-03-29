import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// IMPORT useMutation
import { useQuery, useMutation } from "@apollo/client";

// IMPORT AUTH
import Auth from "../utils/auth";

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
import { SAVE_FAVOURITE } from "../utils/mutations";

import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

const PackageDetails = {
  title: "PackageDetails",
  Category: "Europe",
  Country: "France",
  DepartureDate: "28th,May 2023",
  Duration: "7 days",
  Offer: "all-inclusive",
  Offerdetails: "including activities",
  Discount: "save up to 28%",
  Price: "985$",
};

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  // SET MUTATION
  const [saveFavourite, { error }] = useMutation(SAVE_FAVOURITE);

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
  const handleSaveFavourite = async () => {

    console.log(currentProduct);

    // Get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveFavourite({
        variables:  currentProduct 
      });

      // If book successfully saves to user's account, save book id to state
      // setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <article className="container text-center"></article>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "50px",
          padding: "50px",
          backgroundColor: "white",
          borderRadius: "5px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <h2>{PackageDetails.title}</h2>
          <img
            src={`/images/paris.jpeg`}
            alt={currentProduct.name}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            backgroundColor: "white",
            padding: "40px",
            marginLeft: "20px",
          }}
        >
          <div>
            <p>{PackageDetails.Category}</p>
            <p>{PackageDetails.Country}</p>
          </div>
          <p>{PackageDetails.DepartureDate}</p>
          <p>{PackageDetails.Duration}</p>
          <p>{PackageDetails.Offerdetails}</p>
        </div>
        <div className="text-center" style={{ flexGrow: 1 }}>
          <p>{PackageDetails.Discount}</p>
          <p>
            <strong> Price: </strong>
            {PackageDetails.Price}
          </p>
          <button
            onClick={addToCart}
            style={{
              backgroundColor: "#f47b20",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              marginRight: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            add to cart
          </button>
          <button
            onClick={handleSaveFavourite}
            style={{
              backgroundColor: "#f47b20",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            add to favorite
          </button>
        </div>
      </section>
    </>
  );
  
}

export default Detail;
