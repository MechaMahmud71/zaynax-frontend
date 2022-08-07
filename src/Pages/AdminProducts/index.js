import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminProduct from '../../components/AdminProduct'
import AdminNav from '../../components/AdminNav'
import SideNav from '../../components/SideNav'
import { API_URL } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts() {
        try {
            setLoading(true);
            const { data: { data } } = await axios.get(API_URL + "/product/admin-products");
            setProducts(data)
            setLoading(false);
        } catch (error) {
            setProducts([])
        }
    }
    return (
        <div className=''>
            <AdminNav />
            <div className="row">
                <SideNav />



                <div className="col-10" style={{
                    background: "#f9fafb",

                    minHeight: "100vh",
                    height: "100%"
                }}>
                    {loading && <div className='d-flex pt-5 justify-content-center align-items-center'>
                        <Loading />
                        <div>Loading...</div>
                    </div>}
                    {!loading && <>
                        <div >
                            <button style={{
                                backgroundColor: "white"
                            }} className='btn rounded-pill mt-3 fw-bold border' onClick={() => navigate("/add-product")} >
                                Add New Product
                            </button>
                        </div>

                        <div className="row">
                            {products && products?.map((el, index) => (
                                <div className="col-2 m-3" style={{ background: "white" }} key={index}>
                                    <AdminProduct product={el} />
                                </div>
                            ))}
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default AdminProducts