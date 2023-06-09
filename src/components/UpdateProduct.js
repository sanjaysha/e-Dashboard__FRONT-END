import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  //   const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "GET",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        price,
        category,
        company,
      }),
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    navigate("/");
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="formInput"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* {error && !name && <span className="error-message">Enter valid Name</span>} */}
      <input
        type="number"
        placeholder="Enter Product Price"
        className="formInput"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {/* {error && !price && <span className="error-message">Enter valid Price</span>} */}

      <input
        type="text"
        placeholder="Enter Product Category"
        className="formInput"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {/* {error && !category && <span className="error-message">Enter valid Category</span>} */}

      <input
        type="text"
        placeholder="Enter Product company"
        className="formInput"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {/* {error && !company && <span className="error-message">Enter valid Company</span>} */}

      <button className="addProduct" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
