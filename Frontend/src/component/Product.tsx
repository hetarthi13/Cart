import React from 'react'

function Product() {

    
  return (<>
    <div className='productMain'>
        <table> 
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>           
        </tr>   
        <tbody>
            <tr>
                <td>1</td>
                <td>Product 1</td>
                <td>100</td>
                <td>Category 1</td>
                <td>10</td>
            </tr>
        </tbody>
        </table> 
    </div> 
  </>
  )
}

export default Product