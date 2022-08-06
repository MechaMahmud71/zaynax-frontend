import React from 'react'

import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const OrderModal = ({ setShowModal, setCart }) => {
    const navigate = useNavigate();
    return (
        <div style={{
            position: "fixed",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.5)",
            overflow: "none"
        }}>
            <div className="py-4 px-4 rounded-3" style={{
                background: "white",
                height: "180px",
                width: "200px",

            }}>
                <div className="d-flex justify-content-center">
                    <BsFillCheckCircleFill style={{ fontSize: "25px" }} />
                </div>
                <p style={{
                    fontSize: "15px",
                    textAlign: "center",
                    fontWeight: "500",
                    marginTop: "5px"
                }}>Your Order Placed Successfully</p>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn rounded-pill" style={{
                        fontSize: "13px",
                        backgroundColor: "yellow",
                        fontWeight: "500"
                    }}
                        onClick={() => {
                            localStorage.setItem('cart', JSON.stringify({
                                products: [],
                                subTotal: 0,
                                discount: 0,
                                shippingCharge: 0,
                                walletDebit: 0,
                                total: 0
                            }))
                            setCart({
                                products: [],
                                subTotal: 0,
                                discount: 0,
                                shippingCharge: 0,
                                walletDebit: 0,
                                total: 0
                            })
                            setShowModal(false);
                            navigate("/admin-auth")
                        }}
                    >Go to Admin Pannel</button>
                </div>
            </div>
        </div>
    )
}

export default OrderModal