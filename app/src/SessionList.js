import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const SessionList = () => {

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
     fetch(`/api/sessions`)
      .then(response => response.json())
      .then(data => {
      console.log(data);
        setSessions(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/api/session/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedSessions = [...sessions].filter(i => i.id !== id);
      setSessions(updatedSessions);
    });
  }

  if (loading) {
    return <p>Loading... Sessions.... </p>;
  }

  const sessionList = sessions.map(session => {
    return <tr key={session.id}>
	  <td style={{ whiteSpace: 'nowrap' }}>{session.title}</td>
	  <td style={{ whiteSpace: 'nowrap' }}>{new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }).format(new Date(session.date))} </td>
	  <td style={{ whiteSpace: 'nowrap' }}>{session.description}</td>
	  <td>{session.attendees.map(attendee => {
        return <div>{attendee.id}</div>
      })}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/session/" + session.id}>Join Session</Button>
          <Button size="sm" color="danger" onClick={() => remove(session.id)}>End Session</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/sessions/new">Add Session</Button>
        </div>
        <h3>Sessions</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="10%">Session Title</th>
            <th width="10%">Date</th>
            <th width="10%">Description</th>
			<th width="20%">Attendees</th>
			<th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {sessionList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default SessionList;
