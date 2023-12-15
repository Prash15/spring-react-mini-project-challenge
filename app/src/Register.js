import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const Register = () => {
  const initialFormState = {
    id:'',
    name: '',
    email: '',
    password: ''
  };
  
  const [user, setUser] = useState(initialFormState);
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();    
    await fetch(`/api/v1/user/save`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    setUser(initialFormState);
    navigate('/');
  }

  const title = <h2>{'Register User'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={user.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" value={user.email || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={user.password || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/home">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default Register;
