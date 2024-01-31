import { React, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminProduction = () => {
  // define navigate function
  const navigate = useNavigate();

  // define states
  const [batchNumber, setBatchNumber] = useState();
  const [newBatchNumber, setNewBatchNumber] = useState("");
  const [newProductCode, setNewProductCode] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newDate, setNewDate] = useState("");

  // fetch request function to delete production document
  const deleteProduction = async () => {
    try {
      const res = await fetch("/admin/production", {
        method: "DELETE",
        headers: {
          token: localStorage.getItem("jwt"), //send json web token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batchNumber: batchNumber }),
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

  // This function calls a specific item from the database to be displayed in the editor form
  const getItem = async () => {
    try {
      const res = await fetch("/admin/production", {
        method: "POST",
        headers: {
          token: localStorage.getItem("jwt"), //send json web token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batchNumber: batchNumber }),
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
      if (result.data) {
        setNewBatchNumber(result.data.batchNumber);
        setNewProductCode(result.data.productCode);
        setNewQuantity(result.data.quantity);
        setNewDate(result.data.date);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // this function put an update to a specified batch item
  const editItem = async () => {
    try {
      const res = await fetch("/admin/production", {
        method: "PUT",
        headers: {
          token: localStorage.getItem("jwt"), //send json web token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchNumber: batchNumber,
          newBatchNumber: newBatchNumber,
          productCode: newProductCode,
          quantity: newQuantity,
          date: newDate,
        }),
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
          <InputGroup.Text>Batch Number</InputGroup.Text>
          <Form.Control
            placeholder="****"
            onChange={(e) => setBatchNumber(e.target.value)}
          />
          <Button variant="primary" onClick={() => getItem()}>
            Search
          </Button>
        </InputGroup>
        <hr />
        <InputGroup className="form-group">
          <InputGroup.Text>Batch Number</InputGroup.Text>
          <Form.Control
            value={newBatchNumber}
            onChange={(e) => {
              setNewBatchNumber(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="form-group">
          <InputGroup.Text>Product Code</InputGroup.Text>
          <Form.Control
            value={newProductCode}
            onChange={(e) => {
              setNewProductCode(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="form-group">
          <InputGroup.Text>Quantity</InputGroup.Text>
          <Form.Control
            value={newQuantity}
            onChange={(e) => {
              setNewQuantity(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="form-group">
          <InputGroup.Text>Date</InputGroup.Text>
          <Form.Control
            value={newDate}
            onChange={(e) => {
              setNewDate(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <Button variant="danger" onClick={() => deleteProduction()}>
            Delete
          </Button>
          <Button variant="warning" onClick={() => editItem()}>
            Edit
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default AdminProduction;
