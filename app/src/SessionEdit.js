import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const SessionEdit = () => {
  const initialFormState = {
    title: '',
    description: '',
	date: '',
    attendees: ''
  };
  const [session, setSession] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/api/session/${id}`)
        .then(response => response.json())
        .then(data => setSession(data));
    }
  }, [id, setSession]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setSession({ ...session, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/session${session.id ? `/${session.id}` : ''}`, {
      method: (session.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session),
      credentials: 'include'
    });
    setSession(initialFormState);
    navigate('/session');
  }

  const title = <h2>{session.id ? 'Edit Session' : 'Add Session'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" id="title" value={session.title || ''}
                   onChange={handleChange} autoComplete="title"/>
          </FormGroup>
          <FormGroup>
            <Label for="description">description</Label>
            <Input type="text" name="description" id="description" value={session.description || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="date">date</Label>
            <Input type="text" name="date" id="date" value={session.date || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="attendees">attendees</Label>
              <Input type="text" name="attendees" id="attendees" value={session.attendees || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/sessions">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default SessionEdit;
