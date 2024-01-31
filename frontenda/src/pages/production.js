import { React, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import Print from "../components/Print";

const Production = () => {
  //define states
  const [batchNumber, setBatchNumber] = useState();
  const [productCode, setProductCode] = useState();
  const [quantity, setQuantity] = useState();
  const [refresh, setRefresh] = useState(false); // gets passed into prop for print component to determine when to refresh
  const [finishedGoods, setFinishedGoods] = useState();

  // post request to add document to dispatch collection
  const addProduction = async () => {
    const d = new Date();
    try {
      const res = await fetch("/production", {
        method: "POST",
        headers: {
          token: localStorage.getItem("jwt"), //send json web token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchNumber: batchNumber,
          productCode: productCode,
          quantity: Number(quantity),
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
                  <Form.Label>Product Code</Form.Label>
                  <Form.Select
                    className="form-control"
                    onChange={(e) => {
                      setProductCode(e.target.value);
                    }}
                  >
                    <option key="0" value=""></option>
                    {finishedGoods}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Batch Number</Form.Label>
                  <Form.Control
                    className="form-control"
                    onChange={(e) => {
                      setBatchNumber(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    className="form-control"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </Form.Group>

                <Button variant="primary" onClick={() => addProduction()}>
                  Submit
                </Button>
              </Form>
            </Container>
          </Col>
          <Col xs={7}>
            <Container className="print-container">
              <Container className="print-box">
                <Print link="production" update={refresh} />
              </Container>
            </Container>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Production;
