import { React, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDispatch = () => {
  // define navigate function
  const navigate = useNavigate();

  // define states
  const [dispatchNumber, setDispatchNumber] = useState();

  // fetch request function to delete dispatch document
  const deleteDispatch = async () => {
    try {
      const res = await fetch("/admin/dispatch", {
        method: "DELETE",
        headers: {
          token: localStorage.getItem("jwt"), //send json web token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dispatchNumber: dispatchNumber }),
      });
      const result = await res.json();
      if (result.message) {
        alert(result.message);

        // if not logged in or permission invalid the users will be redirected to the home page
        if (
          result.message === "Invalid Token" ||
          result.message === "You don't hve permission to view this page."
        ) {
          console.log("navigate");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form>
        <InputGroup className="form-group">
          <InputGroup.Text>Dispatch nr</InputGroup.Text>
          <Form.Control
            placeholder="****"
            onChange={(e) => setDispatchNumber(e.target.value)}
          />
          <Button variant="primary">Search</Button>
        </InputGroup>
        <Form.Group className="form-group">
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="danger" onClick={() => deleteDispatch()}>
          Delete
        </Button>
      </Form>
    </div>
  );
};

export default AdminDispatch;
