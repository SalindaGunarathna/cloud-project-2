import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import styled from 'styled-components';
import api from '../services/api';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const ProductDetailContainer = styled.div`
  padding: 2rem 0;
  background: #f8fafc;
  min-height: 100vh;
`;

const BackButton = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const ProductContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  font-size: 1.125rem;
`;

const ProductDescription = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.7;
`;

const ProductMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MetaLabel = styled.span`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
`;

const MetaValue = styled.span`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const AddToCartButton = styled(ActionButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

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

const WishlistButton = styled(ActionButton)`
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
  }
`;

const FeaturesSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const FeaturesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
`;

const FeatureText = styled.span`
  font-weight: 500;
  color: #1e293b;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: #64748b;
  font-size: 1.125rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 4rem;
  color: #ef4444;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const success = await addToCart(product);
    // if (success) {
    //   toast.success('Added to cart successfully!');
    // }
  };

  const handleAddToWishlist = async () => {
    try {
      await api.put('/wishlist', { _id: id });
      toast.success('Added to wishlist!');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  if (loading) {
    return (
      <ProductDetailContainer>
        <LoadingSpinner>Loading product details...</LoadingSpinner>
      </ProductDetailContainer>
    );
  }

  if (error || !product) {
    return (
      <ProductDetailContainer>
        <ErrorMessage>
          <h2>Product Not Found</h2>
          <p>{error || 'The product you are looking for does not exist.'}</p>
        </ErrorMessage>
      </ProductDetailContainer>
    );
  }

  return (
    <ProductDetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FiArrowLeft />
        Back to Products
      </BackButton>

      <ProductContent>
        <ProductImage>
          {product.banner ? (
            <img
              src={product.banner}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
            />
          ) : (
            '🛍️'
          )}
        </ProductImage>

        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>

          <ProductRating>
            <FiStar size={24} />
            <span>4.5 (128 reviews)</span>
          </ProductRating>

          <ProductPrice>${product.price}</ProductPrice>

          <ProductDescription>{product.desc}</ProductDescription>

          <ProductMeta>
            <MetaItem>
              <MetaLabel>Category</MetaLabel>
              <MetaValue>{product.type}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Availability</MetaLabel>
              <MetaValue>{product.available ? 'In Stock' : 'Out of Stock'}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Supplier</MetaLabel>
              <MetaValue>{product.suplier || 'N/A'}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Unit</MetaLabel>
              <MetaValue>{product.unit}</MetaValue>
            </MetaItem>
          </ProductMeta>

          <ProductActions>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={!product.available}
            >
              <FiShoppingCart />
              Add to Cart
            </AddToCartButton>
            <WishlistButton onClick={handleAddToWishlist}>
              <FiHeart />
              Add to Wishlist
            </WishlistButton>
          </ProductActions>
        </ProductInfo>
      </ProductContent>

      <FeaturesSection>
        <FeaturesTitle>Why Choose This Product?</FeaturesTitle>
        <FeaturesGrid>
          <FeatureItem>
            <FeatureIcon>🚚</FeatureIcon>
            <FeatureText>Fast Delivery</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>🛡️</FeatureIcon>
            <FeatureText>Quality Guaranteed</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>💎</FeatureIcon>
            <FeatureText>Premium Quality</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>🔄</FeatureIcon>
            <FeatureText>Easy Returns</FeatureText>
          </FeatureItem>
        </FeaturesGrid>
      </FeaturesSection>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
