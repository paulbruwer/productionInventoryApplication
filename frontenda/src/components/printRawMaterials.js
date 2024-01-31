import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const PrintRaw = (props) => {
  // define navigate function
  const navigate = useNavigate();

  // define states
  const [data, setData] = useState();

  // fetch GET request to retrieve all data from raw materials collection
  const getPrint = async () => {
    const res = await fetch(`/admin/rawMaterials`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("jwt"), //send json web token
      },
    });
    const result = await res.json(); //if data is received, set state
    if (result.data) {
      setData(result.data);
    }
    if (result.message) {
      alert(result.message);

      // if token or permissions invalid redirect to home page
      if (
        result.message === "Invalid Token" ||
        result.message === "You don't hve permission to view this page."
      ) {
        console.log("navigate");
        navigate("/");
      }
    }
  };

  // run getPrint function every time update prop is updated
  useEffect(() => {
    getPrint();
  }, [props.update]);

  //this function formats all the data  into a table using react-data-table-component
  const formatData = () => {
    const columns = [
      {
        name: "Product Code",
        selector: (row) => row.productCode,
        sortable: true,
      },
      {
        name: "Quantity",
        selector: (row) => row.quantity,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => row.date,
        sortable: true,
      },
    ];

    let list = [];
    if (data) {
      data.map((element) => {
        list.push({
          id: element.id,
          productCode: element.productCode,
          quantity: element.quantity,
          date: element.date,
        });
      });
    }
    return <DataTable columns={columns} data={list} />;
  };

  return <div>{formatData()}</div>;
};

export default PrintRaw;
