import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const RestaurantList = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/restaurants`)
      .then(response => response.json())
      .then(data => {
      console.log(data);
        setRestaurants(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/api/restaurant/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedRestaurants = [...restaurants].filter(i => i.id !== id);
      setRestaurants(updatedRestaurants);
    });
  }

  if (loading) {
    return <p>Loading... Restaurants....</p>;
  }

  const restaurantList = restaurants.map(restaurant => {
    const address = `${restaurant.address || ''} ${restaurant.city || ''} ${restaurant.stateOrProvince || ''}`;
    return <tr key={restaurant.id}>
      <td style={{ whiteSpace: 'nowrap' }}>{restaurant.name}</td>
      <td>{address}</td>
      <td>{restaurant.sessions.map(session => {
        return <div key={session.id}>{new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }).format(new Date(session.date))} : {session.title} </div>
      })}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/restaurant/" + restaurant.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(restaurant.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/restaurants/new">Add Restaurant</Button>
        </div>
        <h3>Restaurants</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="20%">Location</th>
            <th>Session Description</th>
            <th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {restaurantList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default RestaurantList;
