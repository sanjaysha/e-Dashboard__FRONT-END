import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);

  let getProductList = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: { authorization: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
      headers: { authorization: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    if (result) {
      getProductList();
    }
  };

  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        method: "GET",
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProductList();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search Product"
        className="search-box"
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Action</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h5>No Product Available!</h5>
      )}
    </div>
  );
};

export default ProductList;
