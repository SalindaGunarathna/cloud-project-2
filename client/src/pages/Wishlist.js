import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiTrash2, FiStar } from 'react-icons/fi';
import styled from 'styled-components';
import api from '../services/api';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const WishlistContainer = styled.div`
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

const WishlistContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const WishlistCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 3rem;
  position: relative;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ef4444;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
    transform: scale(1.1);
  }
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ProductDescription = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-size: 0.875rem;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
`;

const AddToCartButton = styled(ActionButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`;

const ViewButton = styled(ActionButton)`
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
  }
`;

const EmptyWishlist = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const EmptyWishlistIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #cbd5e1;
`;

const EmptyWishlistTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 1rem;
`;

const EmptyWishlistText = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
`;

const BrowseProductsButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
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

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await api.get('/customer/wishlist');
      setWishlist(response.data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      setWishlist(prev => prev.filter(item => item._id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = async (productId) => {
    const success = await addToCart(productId);
    if (success) {
      toast.success('Added to cart successfully!');
    }
  };

  if (loading) {
    return (
      <WishlistContainer>
        <LoadingSpinner>Loading wishlist...</LoadingSpinner>
      </WishlistContainer>
    );
  }

  if (wishlist.length === 0) {
    return (
      <WishlistContainer>
        <Header>
          <HeaderContent>
            <Title>My Wishlist</Title>
            <Subtitle>Save products you love for later</Subtitle>
          </HeaderContent>
        </Header>

        <EmptyWishlist>
          <EmptyWishlistIcon>💝</EmptyWishlistIcon>
          <EmptyWishlistTitle>Your wishlist is empty</EmptyWishlistTitle>
          <EmptyWishlistText>
            Start adding products to your wishlist to see them here.
          </EmptyWishlistText>
          <BrowseProductsButton onClick={() => window.location.href = '/products'}>
            Browse Products
          </BrowseProductsButton>
        </EmptyWishlist>
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
      <Header>
        <HeaderContent>
          <Title>My Wishlist</Title>
          <Subtitle>Save products you love for later</Subtitle>
        </HeaderContent>
      </Header>

      <WishlistContent>
        <WishlistGrid>
          {wishlist.map((item, index) => (
            <WishlistCard
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductImage>
                {item?.banner ? (
                  <img
                    src={item?.banner}
                    alt={item?.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
                  />
                ) : (
                  '🛍️'
                )}
                <RemoveButton
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  title="Remove from wishlist"
                >
                  <FiTrash2 size={16} />
                </RemoveButton>
              </ProductImage>

              <ProductContent>
                <ProductTitle>{item.name}</ProductTitle>
                <ProductDescription>{item.desc}</ProductDescription>

                <ProductMeta>
                  <ProductPrice>${item.price}</ProductPrice>
                  <ProductRating>
                    <FiStar size={16} />
                    <span>4.5</span>
                  </ProductRating>
                </ProductMeta>

                <ProductActions>
                  <AddToCartButton onClick={() => handleAddToCart(item._id)}>
                    <FiShoppingCart />
                    Add to Cart
                  </AddToCartButton>
                  <ViewButton onClick={() => window.location.href = `/products/${item._id}`}>
                    View Details
                  </ViewButton>
                </ProductActions>
              </ProductContent>
            </WishlistCard>
          ))}
        </WishlistGrid>
      </WishlistContent>
    </WishlistContainer>
  );
};

export default Wishlist;
