import React from 'react'
import { IMAGE_URL } from '../Utils/api';

const Product = ({ product }) => {


    return (
        <div className='pt-3 px-2'>

            <div className="col-12"
                style={{ height: "200px" }}
            >
                <img src={IMAGE_URL + product?.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
        </div>
    )
}

export default Product