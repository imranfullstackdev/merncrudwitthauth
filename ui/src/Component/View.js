import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import EditHandler from "./EditHandler";
import { useNavigate } from "react-router-dom";

const View = () => {
  const navigate=useNavigate()
  const [alluser, setAlluser] = useState([]);
  // validating the user with jwt
  const validateUser = async () => {
    const validatinUser = await fetch("http://localhost:8000/View", {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("myToken")}`,
        "Content-type": "application/json",
      },
    });
    const res = await validatinUser.json();
    console.log(res);
    if (validatinUser.status === 401) {
      navigate("/");
    }
  };
  useEffect(() => {
    validateUser();
  }, []);

  // getting all the data from the backend
  const getallUser = async () => {
    const allUSer = await fetch("http://localhost:8000/getall", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const res = await allUSer.json();
    setAlluser(res);
  };

  // deleting user
  const DeleteUser = async (id) => {
    const deleteUser = await fetch(`http://localhost:8000/dlt/${id}`, {
      method: "DELETE",
    });
    const res = await deleteUser.json();
    // console.log(deleteUser);
    if (deleteUser.status === 200) {
      alert("DELETED Sucessfully");
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };

  console.log(alluser);
  useEffect(() => {
    getallUser();
  }, []);

  return (
    <>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {alluser.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <EditHandler props={user} />
                  </td>
                  <td
                    onClick={() => {
                      DeleteUser(user._id);
                    }}
                  >
                    DELETE
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default View;
