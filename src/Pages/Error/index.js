import React from "react";

const Error = () => {
    return (
        <React.Fragment>
            <div
                style={{ height: "100vh" }}
                className="d-flex  align-items-center justify-content-center"
            >
                <div>
                    <p
                        style={{ fontSize: "90px", margin: "0", letterSpacing: "15px" }}
                        className=" text-danger "
                    >
                        404
                    </p>

                    <h3 className="text-danger text-center ">Page not found ..!</h3>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Error;