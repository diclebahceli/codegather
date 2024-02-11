// pages/LoginPage.js
import React from 'react';
import Form from '../components/Form';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic...
  };

  return (
    <div>
      <h2>Login</h2>
      <Card>
        <Form onSubmit={handleSubmit}>
          <InputField type="text" name="username" label="Username" />
          <InputField type="password" name="password" label="Password" />
          <Button onClick={handleSubmit} type="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
