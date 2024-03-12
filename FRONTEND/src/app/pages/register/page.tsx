import React from "react";
import InputField from "../../components/input_field/InputField";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";

export default function Register() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //event.preventDefault();
        // Form submission logic...
    };
    return (
        <div className="flex-col">
            <div className="d-flex justify-content-center align-items-center text-center vh-100 bg-dark">
                <div className="d-flex flex-row align-items-center justify-content-evenly h-75 w-75">
                    <div className="col-3 me-5">
                        <h1 className="display-1 fw-bold text-light" style={{ fontSize: "10rem" }}>Join </h1>
                        <h1 className="display-1 fw-bold m-2 p-2 text-end text-light">
                            Us{" "}
                        </h1>
                    </div>
                    <div className="col-4 h-75">
                        <Card >
                            <div className="pt-5 d-flex flex-column justify-content-center h-100">
                                <h2 className="fw-bold fs-2 mb-3 text-white">Register</h2>
                                <div style={{ margin: "0.5rem", padding: "0rem 3.75rem" }}>
                                    <InputField type="text" name="username" label="username" />
                                </div>
                                <div style={{ margin: "0.5rem", padding: "0rem 3.75rem" }}>
                                    <InputField type="text" name="email" label="email" />
                                </div>
                                <div style={{ margin: "0.5rem", padding: "0rem 3.75rem" }}>
                                    <InputField type="password" name="floatingPassword" label="Password" />
                                </div>
                                <div style={{ margin: "0.5rem", padding: "0rem 3.75rem" }}>
                                    <InputField type="password" name="passwordag" label="password again" />
                                </div>
                                <div className="m-3">
                                    <Button>

                                        <span className="fs-5 p-2">Register</span>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
};
