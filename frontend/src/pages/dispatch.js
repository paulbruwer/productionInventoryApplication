import { useState, useEffect } from "react";
import React from "react";
import Layout from "../components/Layout";
import { Col, Row, Container, Form, Button, InputGroup } from "react-bootstrap";
import PrintDispatch from "../components/PrintDispatch";

const Dispatch = () => {
  //define states
  const [dispatchNr, setDispatchNr] = useState();
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState();
  const [refresh, setRefresh] = useState(false); // gets passed into prop for print component to determine when to refresh
  const [finishedGoods, setFinishedGoods] = useState();

  // add to list of items the will be dispatched. list is in the form of an object
  const addToObjectOfItems = () => {
    let currentList = {};
    if (localStorage.getItem("objectOfItems")) {
      currentList = JSON.parse(localStorage.getItem("objectOfItems"));
    }
    if (!isNaN(quantity)) {
      currentList[item] = quantity;
      localStorage.setItem("objectOfItems", JSON.stringify(currentList));
    } else {
      alert("Quantity value must be a number.");
    }
  };

  // post request to add document to dispatch collection
  const addDispatch = async () => {
    const d = new Date();
    try {
      const res = await fetch("/dispatch", {
        method: "POST",
        headers: {
          token: localStorage.getItem("jwt"), //send json web token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dispatchNumber: dispatchNr,
          items: JSON.parse(localStorage.getItem("objectOfItems")),
          date: d,
        }),
      });
      const result = await res.json();
      setRefresh(!refresh);
      if (result.message) {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get request to get all documents is collection for the drop down list of items
  const getFinishedGoods = async () => {
    try {
      const res = await fetch("/production", {
        method: "GET",
        headers: {
          token: localStorage.getItem("jwt"), //send json web token
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result.data) {
        const list = result.data.map((element) => (
          <option key={element._id} value={element.productCode}>
            {element.productCode}
          </option> //populate drop down list
        ));
        setFinishedGoods(list);
      }
      if (result.message) {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update drop down list on first load
  useEffect(() => {
    getFinishedGoods();
  }, []);

  return (
    <div>
      <Layout>
        <Row>
          <Col xs={5}>
            <Container className="form-container">
              <Form className="form-box">
                <Form.Group className="form-group">
                  <Form.Label>Dispatch Number</Form.Label>
                  <Form.Control
                    className="form-control"
                    onChange={(e) => setDispatchNr(e.target.value)}
                  />
                </Form.Group>

                <InputGroup className="form-group">
                  <InputGroup.Text>Item</InputGroup.Text>
                  <Form.Select
                    className="form-control"
                    onChange={(e) => {
                      setItem(e.target.value);
                    }}
                  >
                    <option key="0" value=""></option>
                    {finishedGoods}
                  </Form.Select>
                  <Form.Control
                    aria-label="productCode"
                    placeholder="Quantity"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                  <Button onClick={() => addToObjectOfItems()} type="submit">
                    Add
                  </Button>
                </InputGroup>

                <Form.Group className="form-group">
                  <Form.Label>Preview</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={localStorage.getItem("objectOfItems")}
                    readOnly
                  />
                </Form.Group>

                <InputGroup>
                  <Button variant="primary" onClick={() => addDispatch()}>
                    Submit
                  </Button>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={() => localStorage.removeItem("objectOfItems")}
                  >
                    Cancel
                  </Button>
                </InputGroup>
              </Form>
            </Container>
          </Col>
          <Col xs={7}>
            <Container className="print-container">
              <Container className="print-box">
                <PrintDispatch link="dispatch" update={refresh} />
              </Container>
            </Container>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Dispatch;
