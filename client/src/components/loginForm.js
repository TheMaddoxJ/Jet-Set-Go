import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
import Auth from "../utils/auth";

// GraphQL API
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

const LoginForm = () => {
  // State to store form data
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // State for form validation
  const [validated] = useState(false);
  // State to show or hide the alert for login errors
  const [showAlert, setShowAlert] = useState(false);

  // useMutation hook for the LOGIN_USER mutation
  const [login, { loading }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Call the login mutation with the form data
      const { data } = await login({
        variables: userFormData,
      });
      // If login is successful then save the login token to the Auth utility
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset form fields after form submission
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
