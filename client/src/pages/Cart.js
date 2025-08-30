import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiShoppingBag, FiArrowRight, FiMinus, FiPlus } from 'react-icons/fi';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const CartContainer = styled.div`
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

const CartContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CartItem = styled(motion.div)`
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 2rem;
  flex-shrink: 0;
`;

const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ItemPrice = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  padding: 0.25rem;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 0.25rem;
  background: white;
  border: 1px solid #e2e8f0;
  color: #475569;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: 500;
  color: #475569;
`;

const RemoveButton = styled.button`
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #fee2e2;
    border-color: #fca5a5;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 1.125rem;
    color: #1e293b;
  }
`;

const SummaryLabel = styled.span`
  color: #64748b;
`;

const SummaryValue = styled.span`
  color: #1e293b;
  font-weight: 500;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #cbd5e1;
`;

const EmptyCartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 1rem;
`;

const EmptyCartText = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: #64748b;
  font-size: 1.125rem;
`;

const Cart = () => {
  const {
    cart,
    loading,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart
  } = useCart();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleCheckout = () => {
    // This would integrate with a payment gateway
    toast.success('Proceeding to checkout...');
  };

  if (loading) {
    return (
      <CartContainer>
        <LoadingSpinner>Loading cart...</LoadingSpinner>
      </CartContainer>
    );
  }

  if (cart.length === 0) {
    return (
      <CartContainer>
        <Header>
          <HeaderContent>
            <Title>Shopping Cart</Title>
            <Subtitle>Your cart is empty</Subtitle>
          </HeaderContent>
        </Header>

        <EmptyCart>
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
          <EmptyCartText>
            Looks like you haven't added any items to your cart yet.
          </EmptyCartText>
          <ContinueShoppingButton to="/products">
            Continue Shopping
            <FiArrowRight />
          </ContinueShoppingButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Header>
        <HeaderContent>
          <Title>Shopping Cart</Title>
          <Subtitle>Review your items and proceed to checkout</Subtitle>
        </HeaderContent>
      </Header>

      <CartContent>
        {cart?.items?.map((item, index) => (
          <CartItem
            key={item._id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ItemImage>
              {item.product?.banner ? (
                <img
                  src={item.product?.banner}
                  alt={item.product?.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
                />
              ) : (
                '🛍️'
              )}
            </ItemImage>

            <ItemDetails>
              <ItemTitle>{item.product?.name || "Product Name"}</ItemTitle>
              <ItemPrice>${item.product?.price || 0}</ItemPrice>

              <ItemActions>
                <QuantityControl>
                  <QuantityButton
                    onClick={() =>
                      handleQuantityChange(item.product?._id, (item.product?.unit || 1) - 1)
                    }
                    disabled={(item.product?.unit || 1) <= 1}
                  >
                    <FiMinus size={16} />
                  </QuantityButton>
                  <QuantityDisplay>{item.product?.unit || 1}</QuantityDisplay>
                  <QuantityButton
                    onClick={() =>
                      handleQuantityChange(item.product?._id, (item.product?.unit || 1) + 1)
                    }
                  >
                    <FiPlus size={16} />
                  </QuantityButton>
                </QuantityControl>

                <RemoveButton onClick={() => handleRemoveItem(item.product?._id)}>
                  <FiTrash2 size={16} />
                  Remove
                </RemoveButton>
              </ItemActions>
            </ItemDetails>
          </CartItem>
        ))}

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>

          <SummaryRow>
            <SummaryLabel>Items ({getCartCount()})</SummaryLabel>
            <SummaryValue>{getCartCount()}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Subtotal</SummaryLabel>
            <SummaryValue>${getCartTotal().toFixed(2)}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Shipping</SummaryLabel>
            <SummaryValue>Free</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Total</SummaryLabel>
            <SummaryValue>${getCartTotal().toFixed(2)}</SummaryValue>
          </SummaryRow>

          <CheckoutButton onClick={handleCheckout}>
            <FiShoppingBag />
            Proceed to Checkout
          </CheckoutButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
