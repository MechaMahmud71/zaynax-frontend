/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { API_URL } from '../Utils/api';
import axios from 'axios';

const UserNav = (props) => {
    const { setProducts } = props;
    const cart = JSON.parse(localStorage.getItem('cart'));
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;
        searchProduct(value);
    }

    async function searchProduct(string) {
        try {
            const { data: { data } } = await axios.get(API_URL + `/product/search?&keyword=${string}`);
            setProducts(data)
        } catch (error) {
            setProducts([])
        }
    }
    return (
        <div>
            <div className="container py-3">
                <div className="row d-flex align-items-center">
                    <div className="col-4" style={{
                        cursor: "pointer"
                    }}>
                        <h3 onClick={() => navigate("/")}>Zaynax-Ecom</h3>
                    </div>
                    <div className="col-4 d-flex align-items-center" style={{
                        borderBottom: "1px solid silver"
                    }}>
                        <FiSearch style={{
                            marginRight: "10px",
                            fontSize: "20px",
                        }} />
                        <DebounceInput type="text" name="keyword" onChange={handleChange} id="" placeholder='Search' style={{
                            border: "none",
                            outline: "none",
                            padding: "10px 0px"
                        }}
                            minLength={1}
                            debounceTimeout={600} />
                    </div>
                    <div className="col-4 d-flex justify-content-center" style={{
                        cursor: "pointer"
                    }} >
                        <div className="col-6 d-flex align-items-center" onClick={() => {
                            navigate("/cart")
                        }} >
                            <AiOutlineShoppingCart style={{
                                fontSize: "30px"
                            }} />
                            <div style={{
                                margin: "0px 10px"
                            }}>Cart</div>
                            <div style={{
                                background: "#facc15",
                                width: "20px",
                                height: "20px",
                            }} className="d-flex justify-content-center align-items-center rounded-circle">{cart?.products?.length}</div>
                        </div>
                        <div className="justify-content-start">
                            <BsPerson style={{
                                fontSize: "30px"
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserNav