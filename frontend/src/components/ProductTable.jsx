import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductTable.css';

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/products')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const placeOrder = () => {
    axios.post('http://localhost:1337/place-order', { selectedProducts })
      .then((response) => {
        console.log(response.data);
        alert('Order placed successfully!');
        setSelectedProducts([]); // Reset selected products after placing the order
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert('Failed to place order. Please try again.');
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
    </div>
  );
};

export default ProductTable;
