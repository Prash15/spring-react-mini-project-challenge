import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const Login = () => {
  const initialFormState = {
    email: '',
    password: ''
  };
  const [login, setLogin] = useState(initialFormState);
  const navigate = useNavigate();
  
  
  const handleChange = (event) => {
    const { name, value } = event.target

    setLogin({ ...login, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/v1/user/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login),
      credentials: 'include'
    });
    setLogin(initialFormState);
    navigate('/');
  }

  const title = <h2>{'Login'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Email</Label>
            <Input type="text" name="name" id="name" value={login.email || ''}
                   onChange={handleChange} autoComplete="email"/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={login.password || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default Login;
