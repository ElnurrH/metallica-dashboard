import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { formatImgUrl } from "../utils/utils";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SINGLE_PRODUCT}${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);
 
  const removeProduct = () => {
    Swal.fire({
      title: "Selected product will be deleted",
      text: "Do you want to delete it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_ALL_PRODUCTS}/${id}`)
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The product has been deleted.",
              "success"
            ).then(() => {
              navigate("/");
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the product.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="productDetails">
      <div className="container">
        <div className="row">
          <div className="leftPart">
            <div className="productImage">
              <img
                className="image"
                key={id}
                src={formatImgUrl(product?.productImage)}
                alt={product?.name}
              />
            </div>
          </div>

          <div className="rightPart">
            <h1 className="productTitle">{product?.name}</h1>
            <p className="productInfo">{product?.details}</p>
            <p className="productPrice">${product?.price}</p>
            <Link to={`/edit/${id}`} className="edit btn">
              Edit
            </Link>
            <button onClick={() => removeProduct()} className="deleteBtn btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
