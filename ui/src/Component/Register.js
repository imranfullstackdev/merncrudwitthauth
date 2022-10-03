import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// name, email, password, Cpassword, phone
const Register = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
    phone: "",
  });
  const changeHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  //   submiting the data to backend
    
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const reg = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await reg.json();
      console.log(res);
      console.log(reg);
    } catch (error) {
      console.log(error);
    }
  };
  const { name, email, password, Cpassword, phone } = data;
  return (
    <>
      <div className="d-flex align-items-center justify-content-center ">
        <Form onSubmit={submitHandler}>
          <h2>
            <b>
              <u>REGISTER</u>
            </b>
          </h2>
          <Form.Group className="mb-3">
            <Form.Label> name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={changeHandler}
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              onChange={changeHandler}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter password"
              name="password"
              onChange={changeHandler}
              value={password}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cpassword</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Cpassword"
              name="Cpassword"
              onChange={changeHandler}
              value={Cpassword}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone"
              name="phone"
              onChange={changeHandler}
              value={phone}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
