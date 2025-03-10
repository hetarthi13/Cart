import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddProductData, GetProductData } from '../redux/productReducer/ProductReducer'
import { AppDispatch } from '../redux/store';

function Product() {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
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
  const handleSubmit = (e : any) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    dispatch(AddProductData(formData))
    // Dispatch action to add product (example: dispatch(AddProduct(formData)))
    setIsModalOpen(false);
    setFormData({image: '',  name: '', price: '', category: '', quantity: '' }); // Reset form
  };

    
  return (<>
  <div className='productMainAll'>
    <h1>Product</h1>
    <button style={{height: "40px"}} className='btn btn-primary' onClick={() => setIsModalOpen(true)}>Add Product</button>
  </div>
  <div className="productMain">
  <table className='table table-bordered'>
    <thead>
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>Image</th>
        <th>Desription</th>
      </tr>
    </thead>
    <tbody>
      {productData?.product && productData?.product?.map((item: any, index: number) => (
        <tr key={item._id || index}>
          <td>{index +1}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.category}</td>
          <td>{item?.description ?? ""}</td>
          <td>{item?.image ?? ""} </td>
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
              <input type="file" name="image" value={formData.image} onChange={handleChange} required />

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