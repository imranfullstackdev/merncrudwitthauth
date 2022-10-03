import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const EditHandler = (props) => {
  const navigate = useNavigate();

  const [data, setdata] = useState(props.props);
  const { name, email, password, Cpassword, phone } = data;

  const changeHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const editHandler = async (e, id) => {
    e.preventDefault();
    console.log(id);
    const editUser = await fetch(`http://localhost:8000/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await editUser.json();
    console.log(editUser);
    console.log(res);
    if (editUser.status === 200) {
        navigate(0);
      alert("Edited Sucessfully");
    } else {
      alert("Something went wrong");
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>EDIT</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                defaultValue={props.props.name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                onChange={changeHandler}
                defaultValue={props.props.email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone"
                name="phone"
                onChange={changeHandler}
                defaultValue={props.props.phone}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              editHandler(e, props.props._id);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditHandler;
