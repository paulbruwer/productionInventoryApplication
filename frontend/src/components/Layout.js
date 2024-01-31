import React from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = (props) => (
  <div>
    <Header />
    {props.children}
    <style>{`
        .form-box{
            color: rgb(255,255,255,0.7);
            text-align: left;
            border: solid 1px rgb(255,255,255,0.3);
            border-radius: 10px;
            padding: 5%;
        }
        .form-group{
            padding-bottom: 5%;
        }
        .form-control{
            background-color: #252a2e;
            color: rgb(255,255,255,0.7);
        }
        .form-control::placeholder {
            color: rgb(255,255,255,0.3);
        }
        .text-muted{
            color: rgb(255,255,255,0.3) !important;
        }
        .form-container{
            padding: 10%;
        }
        .print-container{
            padding: 7%;
        }
        .print-box{
            background-color: white;
            text-align: left;
            border: solid 1px rgb(255,255,255,0.3);
            border-radius: 10px;
            padding: 5%;
        }
    `}</style>
  </div>
);

export default Layout;
