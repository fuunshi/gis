import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductTable.css';

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderResponse, setOrderResponse] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1337/products')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const placeOrder = () => {
    axios.post('http://localhost:1337/place-order', { selectedProducts })
      .then((response) => {
        setOrderResponse(response.data); // Store the API response
        setSelectedProducts([]); // Reset selected products after placing the order
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setOrderResponse({ error: 'Failed to place order. Please try again.' });
      });
  };

  return (
    <div className="table-container">
      <div className="table-scroll">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id} className="table-row">
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => {
                      if (selectedProducts.includes(product.id)) {
                        setSelectedProducts(
                          selectedProducts.filter((id) => id !== product.id)
                        );
                      } else {
                        setSelectedProducts([...selectedProducts, product.id]);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="order-button" onClick={placeOrder}>
        Place Order
      </button>

      {/* Display the response */}
      {orderResponse && (
        <div className="response-container">
          {orderResponse.error ? (
            <div className="error-message">{orderResponse.error}</div>
          ) : (
            <div className="success-message">
              <h3>Order Details</h3>
              {orderResponse.map((group, index) => (
                <div key={index} className="order-group">
                  <h4>Group {index + 1}</h4>
                  <p><strong>Total Weight:</strong> {group.totalWeight} kg</p>
                  <p><strong>Total Price:</strong> ${group.totalPrice}</p>
                  <p><strong>Courier Price:</strong> ${group.courierPrice}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.id}>
                        {item.name} - ${item.price}, {item.weight} kg
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTable;
