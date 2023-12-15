import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const RestaurantEdit = () => {
  const initialFormState = {
    name: '',
    address: '',
    city: '',
    stateOrProvince: '',
    country: '',
    postalCode: ''
  };
  const [restaurant, setRestaurant] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/api/restaurant/${id}`)
        .then(response => response.json())
        .then(data => setRestaurant(data));
    }
  }, [id, setRestaurant]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setRestaurant({ ...restaurant, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/restaurant${restaurant.id ? `/${restaurant.id}` : ''}`, {
      method: (restaurant.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(restaurant),
      credentials: 'include'
    });
    setRestaurant(initialFormState);
    navigate('/restaurants');
  }

  const title = <h2>{restaurant.id ? 'Edit Restaurant' : 'Add Restaurant'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={restaurant.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={restaurant.address || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" value={restaurant.city || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="stateOrProvince">State/Province</Label>
              <Input type="text" name="stateOrProvince" id="stateOrProvince" value={restaurant.stateOrProvince || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="country">Country</Label>
              <Input type="text" name="country" id="country" value={restaurant.country || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="country">Postal Code</Label>
              <Input type="text" name="postalCode" id="postalCode" value={restaurant.postalCode || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/restaurants">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default RestaurantEdit;
