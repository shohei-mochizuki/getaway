import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { REMOVE_FAVOURITE, CHANGE_NAME } from "../utils/mutations";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER } from "../utils/actions";

import Cart from "../components/Cart";

import "./assets/css/dashboard.css";

function Dashboard() {
  // Set up using context
  const [state, dispatch] = useStoreContext();

  // Set up queries and mutations
  const { loading, data: userData } = useQuery(QUERY_USER);
  const [removeFavourite, { error }] = useMutation(REMOVE_FAVOURITE);
  const [changeName, { err }] = useMutation(CHANGE_NAME);

  // Set local state for favourites/savedProducts
  const [favState, setFavState] = useState([]);

  useEffect(() => {
    if (userData) {
      dispatch({
        type: UPDATE_USER,
        favourite: userData.user.savedProducts,
        first: userData.user.firstName,
        last: userData.user.lastName,
      });
      setFavState(userData.user.savedProducts);
    }
  }, [userData, loading, dispatch]);

  let user;

  if (userData) {
    user = userData.user;
  }

  // Function to remove products from favourite in the database
  const handleRemoveFavourite = async (_id) => {
    try {
      const { data } = await removeFavourite({
        variables: { _id: _id },
      });
      setFavState(data.removeFavourite.savedProducts);
    } catch (err) {
      console.error(err);
    }
  };

  // Set up local state for first and last names
  const [formState, setFormState] = useState({ first: "", last: "" });

  // Function to change user's name in the database
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await changeName({
        variables: { firstName: formState.first, lastName: formState.last },
      });
      setFormState({ first: "", last: "" });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
    // Styling for images
  const imageStyle ={
    height: "20vh",
    width: "100%",
    "object-fit": "cover"
  };

  return (
    <>
      <div className="container my-4 shadow rounded py-2">
        <Link style={{ color: "#f3a847" }} to="/">
          ← Back to Main Page
        </Link>

        {user ? (
          <>
            <h2
              className="mb-4 shadow text-white rounded p-2 "
              style={{
                backgroundColor: "#74b6cd",
                "font-family": "cursive",
                "font-size": "1.5rem",
              }}
            >
              Dashboard for {state.first} {state.last}
            </h2>
            <h3
              className="my-4 font-weight-bold fs-4 px-3"
              style={{
                "font-family": "cursive",
                "font-size": "1.5rem",
              }}
            >
              Favourite Packages
            </h3>
            <div
              className="m-3 p-3 rounded shadow rounded-3"
              style={{ border: "2px solid #74b6cd", opacity: "0.9" }}
            >
              <div className="flex-row justify-content-around">
                {favState.map(({ _id, country, image, name, price }, index) => (
                  <div key={index} className="card shadow m-2">
                    <div
                      className="d-country"
                    >
                      {country}
                    </div>
                    <Link to={`/products/${_id}`} style={{ textDecoration: 'none' }}>
                      <img
                        style={imageStyle}
                        alt={name}
                        src={`/images/${image}`}
                      />
                      <p className="d-name">{name}</p>
                    </Link>
                    <div>
                      <span className="d-price">${price}</span>
                    </div>
                    <button
                      className="rounded text-white m-2"
                      onClick={() => handleRemoveFavourite(_id)}
                    >
                      ❌ Delete from favourite
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <h3
              className="my-4 font-weight-bold fs-4 px-3"
              style={{
                "font-family": "cursive",
                "font-size": "1.5rem",
              }}
            >
              Booking History
            </h3>
            {user.orders.map((order) => (
              <div
                key={order._id}
                className="m-3 p-3 rounded shadow rounded-3"
                style={{ border: "2px solid #74b6cd", opacity: "0.9" }}
              >
                <h3
                  style={{
                    "font-family": "cursive",
                    "font-size": "1.2rem",
                    "font-weight": "bold",
                  }}
                >
                  Booked on{" "}
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row justify-content-around">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <h3
              className="my-4 font-weight-bold fs-4 px-3"
              style={{
                "font-family": "cursive",
                "font-size": "1.5rem",
              }}
            >
              Change your name - Mistakes happen!
            </h3>
            <div
              className="m-3 p-3 rounded shadow rounded-3 "
              style={{ border: "2px solid #74b6cd", opacity: "0.9" }}
            >
              <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                  <label htmlFor="firstName">First name:</label>
                  <input
                    placeholder=""
                    name="first"
                    value={formState.first}
                    type="text"
                    id="first"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-row space-between my-2">
                  <label htmlFor="lastName">Last name:</label>
                  <input
                    placeholder=""
                    name="last"
                    value={formState.last}
                    type="text"
                    id="last"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-row flex-end ">
                  <button className="rounded" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : null}
        <Cart />
      </div>
    </>
  );
}

export default Dashboard;
