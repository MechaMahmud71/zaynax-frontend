import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
const SideNav = () => {
    const [showLink, setShowLink] = useState(false)
    return (
        <div className='col-2 border-end justify-content-center pt-3' style={{
            height: "100vh"
        }}>
            <div>
                <div className='ps-5'>
                    <span role="button" onClick={() => setShowLink(!showLink)}>Promotion</span>
                    {showLink &&
                        <>
                            <div className='mx-1 my-2' >
                                <NavLink
                                    to="/promo-codes"
                                >
                                    Promo Codes
                                </NavLink>
                            </div>
                            <div className='mx-1 my-2'>
                                <NavLink
                                    to="/add-promo-codes"
                                >
                                    Add Promo Codes
                                </NavLink>
                            </div>
                        </>
                    }
                </div>
                <div className='my-2 ps-5'>
                    <NavLink
                        to="/orders"
                    >
                        Orders
                    </NavLink>
                </div>
                <div className='my-2 ps-5'>
                    <NavLink
                        to="/admin-products"
                    >
                        Products
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SideNav