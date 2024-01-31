import { React, useState } from "react";
import Layout from "../components/Layout";
import { Form, Button, Container} from "react-bootstrap";

const Index = () => {
  //define states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  //post request to login in user and return a json web token to local storage
  const attemptLogin = async () => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const result = await res.json();
      if (result.token) {
        localStorage.setItem("jwt", result.token);
        setLoginStatus(true);
      }
      if (result.message) {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Logout user by clearing jwt token from local storage
  const Logout = () => {
    setLoginStatus(false);
    localStorage.removeItem("jwt");
  }

  // choose which elements to display in the login screen based on whether the user in logged in or not
  const LogInOut = () => {
    if (loginStatus === false) {
      localStorage.removeItem("jwt");
      return (
        <Form className="form-box">
          <Form.Group className="form-group">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            className="login-button"
            variant="primary"
            onClick={attemptLogin}
          >
            Login
          </Button>
        </Form>
        
      )
    }else {
      return (
        <div>
          <Form className="form-box">
            <Form.Group className="form-group">
              <Form.Label>Your Are Logged In</Form.Label>
            </Form.Group>
            <Button onClick={()=>{Logout()}}>Logout</Button>
          </Form>
        </div>
      )
    }
  }

  return (
    <div>
      <Layout>
        <div className="login-body">
          <Container>
            {LogInOut()}
          </Container>
        </div>
      </Layout>
      <style>{`
                .login-body{
                    padding-top: 10%;
                    padding-left: 30%;
                    padding-right: 30%;
                }
            `}</style>
    </div>
  );
};

export default Index;
