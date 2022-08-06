import React from 'react'
import { IMAGE_URL } from '../Utils/api';

const Product = ({ product, setCart, isAdded, setIsAdded }) => {
    function handleAdd() {
        const newCart = JSON.parse(localStorage.getItem('cart'));
        newCart.products.push(product);
        newCart.subTotal += product.sellingPrice;
        newCart.shippingCharge += product.shippingCharge;
        newCart.total += product.sellingPrice;
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setIsAdded({
            name: product.name,
            added: true
        })
    }

    return (
        <div className={isAdded.name === product.name ? "d-flex align-item-center justify-content-center pt-3" : "row pt-3 "} style={{
            height: "100%"
        }}>
            {isAdded.name !== product.name ? (
                <>
                    <div className="col-12"
                        style={{ height: "200px" }}
                    >
                        <img src={IMAGE_URL + product?.image} alt="" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
                    </div>
                    <p>{product?.name}</p>
                    <div className="row pb-3 align-items-center">
                        <div className="col-9">BDT {product?.sellingPrice}</div>
                        <div className="col-3" style={{
                            backgroundColor: "#facc15",
                            borderRadius: "3px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>{product?.discountRate}%</div>
                    </div>
                </>
            ) : (
                <div style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                    <button className="btn rounded-pill" style={{
                        backgroundColor: "yellow"
                    }}
                        onClick={handleAdd}
                        disabled={isAdded.added}
                    >{isAdded.added ? "Added to Cart" : "Add To cart"}</button>
                </div>
            )}


        </div>
    )
}

export default Product