import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNav = () => {
    const navigate = useNavigate();
    return (
        <div className='border-bottom'>
            <div className="container py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-4" style={{
                        cursor: "pointer"
                    }}>
                        <h3 onClick={() => navigate("/")}>Zaynax-Ecom</h3>
                    </div>
                    <p>User Name</p>
                </div>
            </div>
        </div>
    )
}

export default AdminNav