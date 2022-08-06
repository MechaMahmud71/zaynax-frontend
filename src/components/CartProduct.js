/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs';
import { IMAGE_URL } from '../Utils/api';

const CartProduct = ({ element: el, cart, setCart }) => {
    const [product, setProduct] = useState({
        sellingPrice: el?.sellingPrice,
        quantity: el?.quantity,
        name: el.name,
        color: el.color,
        basePrice: el.basePrice,
        discountRate: el.discountRate,
        image: el.image,
        totalPrice: el?.sellingPrice,
        shippingCharge: el?.shippingCharge
    })

    useEffect(() => {
        for (let i = 0; i < cart.products.length; i++) {
            if (el.name === cart.products[i].name) {
                setProduct(cart.products[i]);
            }
        }
    }, [cart])

    const onAdd = () => {
        const newProduct = { ...product };
        newProduct.quantity += 1;
        newProduct.totalPrice += el.sellingPrice;
        const newCart = { ...cart };
        newCart.subTotal += el.sellingPrice;
        newCart.total += el.sellingPrice;
        setProduct(newProduct);
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].name === el.name) {
                cart.products[i] = newProduct;
            }
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    const onRemove = () => {
        const newProduct = { ...product };
        newProduct.quantity -= 1;
        if (newProduct.quantity > 0) {
            newProduct.totalPrice -= el.sellingPrice;
            const newCart = { ...cart };
            newCart.subTotal -= el.sellingPrice;
            newCart.total -= el.sellingPrice;
            setProduct(newProduct);
            for (let i = 0; i < cart.products.length; i++) {
                if (cart.products[i].name === el.name) {
                    cart.products[i] = newProduct;
                }
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        }
    }

    const onDelete = () => {
        const newCart = JSON.parse(localStorage.getItem('cart'));
        let newProductsArr = [];
        const newProduct = product;
        for (let i = 0; i < newCart.products.length; i++) {
            if (newCart.products[i].name !== newProduct.name) {
                newProductsArr.push(newCart.products[i]);
            }
        }
        newCart.subTotal -= (el.sellingPrice * newProduct.quantity);
        newCart.total -= (el.sellingPrice * newProduct.quantity);
        newCart.shippingCharge -= newProduct.shippingCharge;
        newCart.products = newProductsArr;
        localStorage.setItem('cart', JSON.stringify(newCart));

        setCart(newCart)
    }
    return (
        <div className="row mb-1 px-2 py-3 rounded" style={{
            background: "white"
        }} >
            <div className="col-2"
                style={{
                    height: "100px"
                }}
            >
                <img src={IMAGE_URL + product?.image} alt="" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="col-10">
                <div className=" d-flex justify-content-between">
                    <p>{el.name}</p>
                    <BsFillTrashFill style={{
                        cursor: "pointer"
                    }}
                        onClick={onDelete}
                    />
                </div>
                <div className=" d-flex justify-content-between align-items-center">
                    <p className='col-4'><span className='pe-2'>Color:{el.color}</span><span className='ps-2'>Size:XL</span></p>
                    <p className='col-4'>Shipping Method:EMS</p>
                    <p className="d-flex col-4 align-items-center">
                        <span className='pe-2'>Quantity:</span>
                        <div style={{
                            width: "80px"
                        }} className="border d-flex align-items-center justify-content-between  rounded-pill">
                            <span className='ps-2' role="button" onClick={onAdd}>+</span>
                            <span>{product.quantity}</span>
                            <span className='pe-2' role="button" onClick={onRemove}>-</span>
                        </div>
                    </p>
                </div>
                <div className="row d-flex justify-content-between">
                    <p className='col-4'>Product Price: BDT,{el.sellingPrice}</p>
                    <p className='col-4' >Shipping Charge:{el.shippingCharge}</p>
                    <p className='col-4'>
                        Total Price:BDT:{el.sellingPrice * product.quantity}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartProduct