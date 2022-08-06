import React, { useEffect, useState } from 'react'
import UserNav from '../../components/UserNav';
import { useNavigate } from 'react-router-dom';
import CartProduct from '../../components/CartProduct';
import axios from 'axios';
import { API_URL } from '../../Utils/api';
import OrderModal from '../../components/OrderModal';

const Cart = () => {
    const navigate = useNavigate();
    const cartLocal = JSON.parse(localStorage.getItem('cart'));
    const [cart, setCart] = useState(cartLocal);
    const [error, setError] = useState("");
    const [isChecked, setChecked] = useState(false)
    const [showChecked, setShowChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setCart(cart)

    }, [cart])

    const [formData, setFormData] = useState({
        code: "",
        date: new Date().toISOString()
    })



    const handleApply = async () => {
        try {
            if (localStorage.getItem('token')) {
                const { data } = await axios.post(API_URL + "/promo-code/use-code", formData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
                const newCart = { ...cart };
                newCart.subTotal = newCart.subTotal - Math.floor((newCart.subTotal * data.data.discountRate) / 100);
                newCart.total = newCart.subTotal;
                newCart.discount = Math.floor((newCart.subTotal * data.data.discountRate) / 100);
                setCart(newCart);
                localStorage.setItem('cart', JSON.stringify(newCart));
                setError("");
            } else if (!localStorage.getItem('token')) {
                navigate("/user-auth")
            }


        } catch (error) {
            setError(error.response.data.error)
        }
    }

    const handleOrder = async () => {
        try {
            if (localStorage.getItem('token') && isChecked) {
                await axios.post(API_URL + "/order/place-order", {
                    cart: localStorage.getItem('cart')
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });

                setShowModal(true);
            } else if (!localStorage.getItem('token')) {
                navigate("/user-auth")
            } else if (!isChecked) {
                setShowChecked(true)
            }



        } catch (error) {
            setError(error.error)
        }
    }



    return (
        <>
            <UserNav />
            <div style={{
                backgroundColor: "#f9fafb",
                width: "100vw",
                minHeight: "100vh",
                height: "100%",
                position: "relative"

            }}>
                <div className="container">
                    <button style={{
                        backgroundColor: "white"
                    }} className='btn rounded-pill mt-3 fw-bold border' onClick={() => navigate("/")} >
                        Go Back
                    </button>
                    <div className="row mt-3">
                        <div className="col-8">
                            {cart.products && cart.products?.map((el, index) => (
                                <CartProduct cart={cart} setCart={setCart} key={index} element={el} />
                            ))}

                            {!cart?.products && (
                                <>
                                    <div className='row'>
                                        No Product is Added
                                    </div>
                                </>
                            )}

                            <div className="row px-2 py-3 mb-3 rounded" style={{
                                backgroundColor: "white"
                            }}>
                                {!isChecked && showChecked && <div className="text-danger fw-bold" style={{
                                    fontSize: "12px"
                                }}>You Must agree to the terms and conditions</div>}
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <div className='align-items-center'>
                                        <input type="radio" onChange={() => {
                                            setShowChecked(false);
                                            setChecked(true)
                                        }} />
                                        <label htmlFor="">I agree to the terms and Conditions, Privacy Policy & Refund Policy</label>
                                    </div>
                                    <button className="btn px-4 py-1" style={{
                                        backgroundColor: "#facc15",
                                        outline: "none"
                                    }}
                                        onClick={handleOrder}
                                    >CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 ms-1" >
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
                                        placeholder="Type your code"
                                        onChange={(e) => { setFormData({ ...formData, code: e.target.value }) }}
                                    />
                                    <button className='btn rounded-0 ' style={{
                                        background: "#f1f5f9"
                                    }}
                                        onClick={handleApply}
                                        disabled={cart.discount !== 0}
                                    >Apply</button>
                                </div>
                                {error && <small className='text-danger' style={{ fontSize: "13px", textAlign: "center" }}>{error}</small>}
                                <div className="d-flex justify-content-between pt-3 border-top mt-1">
                                    <p className="mb-0">Total Payable</p>
                                    <p className='mb-0'>৳ {cart.total + cart.shippingCharge - cart.discount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {showModal && <OrderModal setShowModal={setShowModal} setCart={setCart} />}
        </>
    )
}

export default Cart