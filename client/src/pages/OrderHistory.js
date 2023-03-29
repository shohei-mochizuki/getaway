import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { REMOVE_FAVOURITE, CHANGE_NAME } from '../utils/mutations';

function OrderHistory() {
  // Set up queries and mutations
  const { data } = useQuery(QUERY_USER);
  const [removeFavourite, { error }] = useMutation(REMOVE_FAVOURITE);
  const [changeName, { err }] = useMutation(CHANGE_NAME);

  let user;

  if (data) {
    user = data.user;
  }

  console.log (data?.user);

  const handleRemoveFavourite = async (_id) => {

    console.log("BUTTON CLICKED");

    try {
      const { data } = await removeFavourite({
        variables: { _id: _id}}); 
        window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // Set up local state
  const [formState, setFormState] = useState({ first: "", last: "" });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await changeName({
        variables: { firstName: formState.first, lastName: formState.last },
      });
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


  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Main Page</Link>

        {user ? (
          <>
            <h2 className="mb-4">
              Dashboard for {user.firstName} {user.lastName}
            </h2>
            <h3 className="my-4">
              Favourite Packages
            </h3>
            <div className="m-3 p-3 rounded rounded-3 bg-primary">
              <div className="flex-row justify-content-around">
                {user.savedProducts.map(({ _id, image, name, price, packageId }, index) => (
                  <div key={index} className="card px-1 py-1">
                    <Link to={`/products/${_id}`}>
                      <img alt={name} src={`/images/${image}`} />
                      <p>{name}</p>
                    </Link>
                    <div>
                      <span>${price}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFavourite(_id)}
                    >❌ Delete from favourite</button>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="my-4">
              Booking History
            </h3>
            {user.orders.map((order) => (
              <div key={order._id} className="m-3 p-3 rounded rounded-3 bg-primary">
                <h3>
                  Booked on {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
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
              </div>))}
              <h3 className="my-4">
              Change your name - Mistakes happen!
              </h3>
              <div className="m-3 p-3 rounded rounded-3 bg-primary">
                <form onSubmit={handleFormSubmit}>
                  <div className="flex-row space-between my-2">
                    <label htmlFor="firstName">First name:</label>
                    <input
                      placeholder=""
                      name="first"
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
                      type="text"
                      id="last"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
