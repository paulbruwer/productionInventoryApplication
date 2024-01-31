import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const PrintDispatch = (props) => {
  // define navigate function
  const navigate = useNavigate();

  // define states
  const [data, setData] = useState();

  // fetch GET request to retrieve all data from collection specified by link prop
  const getPrint = async () => {
    const res = await fetch(`/${props.link}/print`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("jwt"), //send json web token
      },
    });
    const result = await res.json();
    if (result.data) {
      setData(result.data); //if data is received, set state
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
        name: "Dispatch Number",
        selector: (row) => row.dispatchNumber,
        sortable: true,
      },
      {
        name: "Items",
        selector: (row) => row.items,
        sortable: true,
      },
      {
        name: "User",
        selector: (row) => row.user,
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
        let formattedItems = "";
        for (const key in element.items) {
          formattedItems += `${element.items[key]}:\t${key}\n`;
        }
        list.push({
          id: element.id,
          dispatchNumber: element.dispatchNumber,
          items: formattedItems,
          user: element.user,
          date: element.date,
        });
      });
    }
    return <DataTable columns={columns} data={list} />;
  };

  return <div>{formatData()}</div>;
};

export default PrintDispatch;
