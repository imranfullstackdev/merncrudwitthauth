import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = data;
      const loginUser = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const res = await loginUser.json();
      localStorage.setItem("myToken", res.token,{
        expires:new Date(Date.now()+250000000)
      });
      if (loginUser.status === 200) {
        navigate("/View");
      }
      console.log(loginUser);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-center ">
        <Form onSubmit={submitHandler}>
          <h2 className="mt-5 ">
            <b>
              <u>LOGIN</u>
            </b>
          </h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={changeHandler}
              name="email"
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={changeHandler}
              name="password"
              value={password}
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

export default Login;
