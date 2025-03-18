import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProductData, GetProductData } from "../redux/productReducer/ProductReducer";
import { AppDispatch } from "../redux/store";

function Product() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    image: File | string;
    name: string;
    price: string;
    category: string;
    quantity: string;
  }>({
    image: "", // ✅ Default to an empty string instead of null
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  const productData = useSelector((state: any) => state.product);
  console.log("📦 Product Data:", productData);

  useEffect(() => {
    dispatch(GetProductData());
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = e.target;
  
    if (type === "file" && files && files.length > 0) {
      const selectedFile = files[0];
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedFile, // ✅ Store the actual File object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!formData.name || !formData.price || !formData.category || !formData.image) {
      console.warn("⚠️ Please fill all required fields");
      return;
    }
  
    // ✅ Create FormData to send binary image data
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
  
    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image); // ✅ Attach File
    } else {
      console.error("❌ Image is not a File object:", formData.image);
      return;
    }
  
    console.log("🚀 Submitting FormData:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
    dispatch(AddProductData(formData))
    setIsModalOpen(false);
    window.location.href = "/Home";
  
    // try {
    //   const response = await fetch("http://localhost:4000/api/addProduct", {
    //     method: "POST",
    //     body: formDataToSend, // ✅ Send FormData
    //   });
  
    //   const data = await response.json();
    //   console.log("✅ Success Response:", data);
  
    //   setIsModalOpen(false);
    //   setFormData({ image: "", name: "", price: "", category: "", quantity: "" });
    // } catch (error) {
    //   console.error("❌ Error submitting product:", error);
    // }
  };
  
  return (
    <>
      <div className="productMainAll">
        <h1>Product</h1>
        <button className="btn btn-primary p-2" onClick={() => setIsModalOpen(true)}>
          Add Product
        </button>
      </div>

      <div className="productMain">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
              {/* <th>Description</th> */}
            </tr>
          </thead>
          <tbody>
            {productData?.product?.map((item: any, index: number) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  {item.image ? <img src={item.image} alt="Product" width="50" /> : "No Image"}
                </td>
                <td><button className="btn btn-primary p-2 me-2">Edit</button><button className="btn btn-danger p-2">Delete</button></td>
                {/* <td>{item?.description ?? ""}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />

              <label>Price:</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />

              <label>Category:</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required />

              <label>Image:</label>
              <input type="file" name="image"   onChange={handleChange} accept="image/*" required />

              {formData.image && typeof formData.image !== "string" && (
                <img src={URL.createObjectURL(formData.image)} alt="Preview" width="100" />
              )}

              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
