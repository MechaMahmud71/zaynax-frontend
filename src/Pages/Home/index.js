/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from '../../components/Product'
import UserNav from '../../components/UserNav';
import { API_URL } from '../../Utils/api';

export const Home = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState({
        products: [],
        subTotal: 0,
        discount: 0,
        shippingCharge: 0,
        walletDebit: 0,
        total: 0
    })

    useEffect(() => {
        getProducts();
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

    async function getProducts() {
        try {
            const { data: { data } } = await axios.get(API_URL + "/product/products");
            setProducts(data)
        } catch (error) {
            setProducts([])
        }
    }

    const [isAdded, setIsAdded] = useState({
        name: "",
        added: false
    })

    const findOne = (product) => {
        const newCart = JSON.parse(localStorage.getItem('cart'));
        if (newCart.products.find(el => el.name === product.name)) {
            setIsAdded({
                name: product.name,
                added: true
            })
        } else {
            setIsAdded({
                name: product.name,
                added: false
            })
        }
    }

    return (
        <>
            <UserNav setProducts={setProducts} />
            <div style={{
                backgroundColor: "#f1f5f9",
                width: "100vw",
                minHeight: "100vh",
                height: "100%"

            }}>
                <div className='container'>
                    <div className="row">
                        {products && products?.map((el, index) => (
                            <div onMouseEnter={() => {
                                findOne(el)
                            }} onMouseLeave={() => setIsAdded({
                                name: "",
                                added: false
                            })} className="col-2 m-3" style={{ background: "white" }} key={index}>
                                <Product isAdded={isAdded} product={el} setCart={setCart} setIsAdded={setIsAdded} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
