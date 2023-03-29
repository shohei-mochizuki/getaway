import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);

  let user;

  if (data) {
    user = data.user;
  }

  console.log (data?.user);

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
                      onClick={() => removeFavourite(packageId)}
                    >❌ Delete from favourite</button>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="my-4">
              Order History
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
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
