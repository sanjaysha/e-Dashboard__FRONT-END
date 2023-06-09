import React from "react";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setcompany] = useState("");
  const [error, setError] = useState(false)

  const addProduct = async () => {
    if(!name || !price || !category || !company){
        setError(true)
        return false
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        category,
        company,
        userId,
      }),
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
        "Content-Type": "application/json",
      },
    });
    result = await result.json()
  };

  return (
    <div className="product">
      <h1>Add Product Page</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="formInput"
        value={name}
        onChange={(e) => {setName(e.target.value)}}
      />
      {error && !name && <span className="error-message">Enter valid Name</span>}
      <input
        type="number"
        placeholder="Enter Product Price"
        className="formInput"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span className="error-message">Enter valid Price</span>}

      <input
        type="text"
        placeholder="Enter Product Category"
        className="formInput"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <span className="error-message">Enter valid Category</span>}

      <input
        type="text"
        placeholder="Enter Product company"
        className="formInput"
        value={company}
        onChange={(e) => setcompany(e.target.value)}
      />
      {error && !company && <span className="error-message">Enter valid Company</span>}

      <button className="addProduct" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
