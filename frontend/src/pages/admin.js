import { React, useState } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import AdminReceiving from "../components/AdminReceiving";
import AdminProduction from "../components/AdminProduction";
import AdminDispatch from "../components/AdminDispatch";
import Print from "../components/Print";
import PrintDispatch from "../components/PrintDispatch";
import PrintRaw from "../components/printRawMaterials";
import PrintFinishedGoods from "../components/PrintFinishedGoods";

const Admin = () => {
  // define state the determines when the print components will refresh
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <Layout>
        <Row>
          <Col xs={5}>
            <Container className="form-container">
              <Container
                className="form-box"
                onClick={() => {
                  setRefresh(!refresh);
                }}
              >
                <Tabs defaultActiveKey="receiving" className="mb-3">
                  <Tab eventKey="receiving" title="Receiving">
                    <AdminReceiving />
                  </Tab>
                  <Tab eventKey="production" title="Production">
                    <AdminProduction />
                  </Tab>
                  <Tab eventKey="dispatch" title="Dispatch">
                    <AdminDispatch />
                  </Tab>
                </Tabs>
              </Container>
            </Container>
          </Col>
          <Col xs={7}>
            <Container className="print-container">
              <Container className="print-box">
                <Tabs onClick={() => setRefresh(!refresh)}>
                  <Tab eventKey="receivingPrint" title="Receiving">
                    <Print link="receiving" update={refresh} />
                  </Tab>
                  <Tab eventKey="productionPrint" title="Production">
                    <Print link="production" update={refresh} />
                  </Tab>
                  <Tab eventKey="dispatchPrint" title="Dispatch">
                    <PrintDispatch link="dispatch" update={refresh} />
                  </Tab>
                  <Tab eventKey="rawMaterialsPrint" title="Materials">
                    <PrintRaw update={refresh} />
                  </Tab>
                  <Tab eventKey="finishedGoodsPrint" title="Finished Goods">
                    <PrintFinishedGoods update={refresh} />
                  </Tab>
                </Tabs>
              </Container>
            </Container>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Admin;
