import React from 'react'

function Checkout() {
  return (<>
   <div className="container mt-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        {/* Billing Information */}
        <div className="col-md-6">
          <h4>Billing Details</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="email@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" placeholder="123 Main St" />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input type="text" className="form-control" placeholder="City" />
            </div>
            <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input type="text" className="form-control" placeholder="12345" />
            </div>
          </form>
        </div>

        {/* Payment and Order Summary */}
        <div className="col-md-6">
          <h4>Payment</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input type="text" className="form-control" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="mb-3">
              <label className="form-label">Expiration</label>
              <input type="text" className="form-control" placeholder="MM/YY" />
            </div>
            <div className="mb-3">
              <label className="form-label">CVV</label>
              <input type="text" className="form-control" placeholder="123" />
            </div>
          </form>

          <h4 className="mt-4">Order Summary</h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between">
              <span>Item 1</span>
              <strong>$29.99</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Item 2</span>
              <strong>$19.99</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>$49.98</strong>
            </li>
          </ul>

          <button className="btn btn-primary w-100">Place Order</button>
        </div>
      </div>
    </div>
  </>
  )
}

export default Checkout