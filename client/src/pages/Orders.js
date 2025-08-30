import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiCalendar, FiDollarSign, FiTruck } from 'react-icons/fi';
import styled from 'styled-components';
import api from '../services/api';

const OrdersContainer = styled.div`
  padding: 2rem 0;
  background: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
`;

const OrdersContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const OrderCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const OrderHeader = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const OrderNumber = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
`;

const OrderDate = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderStatus = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const StatusDelivered = styled(OrderStatus)`
  background: #f0fdf4;
  color: #059669;
  border: 1px solid #bbf7d0;
`;

const StatusProcessing = styled(OrderStatus)`
  background: #fef3c7;
  color: #d97706;
  border: 1px solid #fed7aa;
`;

const StatusShipped = styled(OrderStatus)`
  background: #dbeafe;
  color: #2563eb;
  border: 1px solid #93c5fd;
`;

const StatusPending = styled(OrderStatus)`
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
`;

const OrderBody = styled.div`
  padding: 1.5rem;
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

const OrderSummary = styled.div`
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OrderTotal = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
`;

const OrderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

const ViewDetailsButton = styled(ActionButton)`
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
  }
`;

const TrackOrderButton = styled(ActionButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const EmptyOrdersIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #cbd5e1;
`;

const EmptyOrdersTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 1rem;
`;

const EmptyOrdersText = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: #64748b;
  font-size: 1.125rem;
`;

const getStatusComponent = (status) => {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return StatusDelivered;
    case 'processing':
      return StatusProcessing;
    case 'shipped':
      return StatusShipped;
    default:
      return StatusPending;
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/shopping/orders');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <OrdersContainer>
        <LoadingSpinner>Loading orders...</LoadingSpinner>
      </OrdersContainer>
    );
  }

  if (orders.length === 0) {
    return (
      <OrdersContainer>
        <Header>
          <HeaderContent>
            <Title>My Orders</Title>
            <Subtitle>Track your order history and status</Subtitle>
          </HeaderContent>
        </Header>

        <EmptyOrders>
          <EmptyOrdersIcon>📦</EmptyOrdersIcon>
          <EmptyOrdersTitle>No orders yet</EmptyOrdersTitle>
          <EmptyOrdersText>
            You haven't placed any orders yet. Start shopping to see your order history here.
          </EmptyOrdersText>
        </EmptyOrders>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <Header>
        <HeaderContent>
          <Title>My Orders</Title>
          <Subtitle>Track your order history and status</Subtitle>
        </HeaderContent>
      </Header>

      <OrdersContent>
        {orders.map((order, index) => {
          const StatusComponent = getStatusComponent(order.status);

          return (
            <OrderCard
              key={order._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <OrderHeader>
                <OrderInfo>
                  <OrderNumber>Order #{order._id?.slice(-8) || 'N/A'}</OrderNumber>
                  <OrderDate>
                    <FiCalendar size={16} />
                    {formatDate(order.createdAt)}
                  </OrderDate>
                </OrderInfo>
                <StatusComponent>{order.status || 'Pending'}</StatusComponent>
              </OrderHeader>

              <OrderBody>
                <OrderItems>
                  {order.items?.map((item, itemIndex) => (
                    <OrderItem key={itemIndex}>
                      <ItemImage>
                        {item.product?.banner || '🛍️'}
                      </ItemImage>
                      <ItemDetails>
                        <ItemName>{item.product?.name || 'Product Name'}</ItemName>
                        <ItemPrice>
                          ${item.product?.price || 0} x {item.unit || 1}
                        </ItemPrice>
                      </ItemDetails>
                    </OrderItem>
                  )) || (
                      <OrderItem>
                        <ItemImage>🛍️</ItemImage>
                        <ItemDetails>
                          <ItemName>Product Name</ItemName>
                          <ItemPrice>Price x Quantity</ItemPrice>
                        </ItemDetails>
                      </OrderItem>
                    )}
                </OrderItems>

                <OrderSummary>
                  <OrderTotal>
                    <FiDollarSign />
                    Total: ${order.totalAmount || 0}
                  </OrderTotal>

                  <OrderActions>
                    <ViewDetailsButton>View Details</ViewDetailsButton>
                    <TrackOrderButton>
                      <FiTruck size={16} />
                      Track Order
                    </TrackOrderButton>
                  </OrderActions>
                </OrderSummary>
              </OrderBody>
            </OrderCard>
          );
        })}
      </OrdersContent>
    </OrdersContainer>
  );
};

export default Orders;
