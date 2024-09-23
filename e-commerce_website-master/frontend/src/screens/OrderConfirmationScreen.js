import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'; // Ensure ListGroup is imported
import Axios from 'axios';
import { Store } from '../store';
import { useContext } from 'react';
import LoadingBox from '../components/LoadingBox';

import MessageBox from '../components/MessageBox';
import getError from '../util.js';

export default function OrderConfirmationScreen() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(getError(err));
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, userInfo.token]);

  return (
    <div>
      <Helmet>
        <title>Order Confirmation</title>
      </Helmet>
      <h1 className="my-3">Order Confirmation</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order {order._id}</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </Card.Text>
              <Card.Title>Payment Method</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              <Card.Title>Order Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <div className="d-grid">
            <Button
              type="button"
              onClick={() => navigate('/')}
            >
              Go to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
