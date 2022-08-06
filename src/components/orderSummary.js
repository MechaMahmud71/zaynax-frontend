import React from 'react'

const orderSummary = ({ cart }) => {
    return (
        <div className="d-flex flex-column justify-content-between p-3 rounded" style={{
            background: "white"
        }}>
            <div className='border-bottom pb-2'>
                <div className="row border-bottom">
                    <p className="text-center mb-0 pb-1">ORDER SUMMARY</p>
                </div>
                <div className="d-flex justify-content-between p-1">
                    <p className="mb-0">Subtotal({cart.products.length} items)</p>
                    <p className='mb-0'>৳ {cart.subTotal}</p>
                </div>
                <div className="d-flex justify-content-between p-1">
                    <p className="mb-0">Discount</p>
                    <p className='mb-0'>৳ {cart.discount}</p>
                </div>
                <div className="d-flex justify-content-between p-1">
                    <p className="mb-0">Shipping Charge</p>
                    <p className='mb-0'>৳ {cart.shippingCharge}</p>
                </div>
                <div className="d-flex justify-content-between p-1">
                    <p className="mb-0">Wallet Debit</p>
                    <p className='mb-0'>৳ 0</p>
                </div>
            </div>
            <div className='d-flex border my-3 justify-content-between'>
                <input type="text" style={{
                    outline: "none",
                    border: "none",
                    padding: "0px 8px"
                }}

                />
                <button className='btn rounded-0 ' style={{
                    background: "#f1f5f9",
                }}
                    onClick={() => console.log("hi")}
                >Apply</button>
            </div>
            <div className="d-flex justify-content-between pt-3 border-top mt-1">
                <p className="mb-0">Total Payable</p>
                <p className='mb-0'>৳ {cart.total + cart.shippingCharge}</p>
            </div>
        </div>
    )
}

export default orderSummary