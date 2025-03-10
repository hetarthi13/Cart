import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProductData } from '../redux/productReducer/ProductReducer'
import { AppDispatch } from '../redux/store';

function Product() {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    category: '',
    quantity: '',
  });

  const productData = useSelector((state : any) => state.product)
  console.log(productData,"productData");
  

  useEffect(() => {
dispatch(GetProductData())
  },[dispatch])

  const handleChange = (e :any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (You can modify it to dispatch an action)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Dispatch action to add product (example: dispatch(AddProduct(formData)))
    setIsModalOpen(false);
    setFormData({ id: '', name: '', price: '', category: '', quantity: '' }); // Reset form
  };

    
  return (<>
  <div className='productMainAll'>
    <h1>Product</h1>
    <button onClick={() => setIsModalOpen(true)}>Add Product</button>
  </div>
  <div className="productMain">
  <table className='table table-bordered'>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {productData?.product?.map((item: any, index: number) => (
        <tr key={item._id || index}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.category}</td>
          <td>{item.quantity || "N/A"}</td>
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
              <label>Id:</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} required />

              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />

              <label>Price:</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />

              <label>Category:</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required />

              <label>Quantity:</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
  </>
  )
}

export default Product