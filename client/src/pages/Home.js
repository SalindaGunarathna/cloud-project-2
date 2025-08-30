import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import styled from 'styled-components';
import api from '../services/api';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 1rem;
  background: #f8fafc;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const ProductsSection = styled.section`
  padding: 4rem 0;
  background: #f8fafc;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProductCard = styled(motion.div)`
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
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 1rem;
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
`;

const AddToCartButton = styled(ActionButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
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

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Fetch products from different categories to show variety
      const categories = ['fruits', 'vegetables', 'oils'];
      const products = [];

      for (const category of categories) {
        try {
          const response = await api.get(`/category/${category}`);
          if (response.data && response.data.length > 0) {
            products.push(response.data[0]); // Get first product from each category
          }
        } catch (error) {
          console.error(`Error fetching ${category} products:`, error);
        }
      }

      setFeaturedProducts(products);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>Welcome to ShopHub</HeroTitle>
            <HeroSubtitle>
              Discover amazing products, great deals, and exceptional service.
              Your one-stop destination for all your shopping needs.
            </HeroSubtitle>
            <HeroButton to="/products">
              Start Shopping
              <FiArrowRight />
            </HeroButton>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <div className="container">
          <SectionHeader>
            <SectionTitle>Why Choose ShopHub?</SectionTitle>
            <SectionSubtitle>
              We provide the best shopping experience with quality products and excellent service
            </SectionSubtitle>
          </SectionHeader>

          <FeaturesGrid>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureIcon>🚚</FeatureIcon>
                <FeatureTitle>Fast Delivery</FeatureTitle>
                <FeatureDescription>
                  Get your products delivered quickly and safely to your doorstep
                </FeatureDescription>
              </FeatureCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureIcon>🛡️</FeatureIcon>
                <FeatureTitle>Secure Shopping</FeatureTitle>
                <FeatureDescription>
                  Your data and payments are protected with industry-standard security
                </FeatureDescription>
              </FeatureCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureIcon>💎</FeatureIcon>
                <FeatureTitle>Quality Products</FeatureTitle>
                <FeatureDescription>
                  We only offer products that meet our high quality standards
                </FeatureDescription>
              </FeatureCard>
            </motion.div>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <ProductsSection>
        <SectionHeader>
          <SectionTitle>Featured Products</SectionTitle>
          <SectionSubtitle>
            Check out some of our most popular products
          </SectionSubtitle>
        </SectionHeader>

        {loading ? (
          <div className="loading">Loading featured products...</div>
        ) : (
          <ProductsGrid>
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard>
                  <ProductImage>
                    {product.banner ? (
                      <img
                        src={product.banner}
                        alt={product.name}
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : (
                      '🛍️'
                    )}
                  </ProductImage>
                  <ProductContent>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductPrice>${product.price}</ProductPrice>
                    <ProductActions>
                      <AddToCartButton>
                        <FiShoppingCart />
                        Add to Cart
                      </AddToCartButton>
                      <WishlistButton>
                        <FiHeart />
                      </WishlistButton>
                    </ProductActions>
                  </ProductContent>
                </ProductCard>
              </motion.div>
            ))}
          </ProductsGrid>
        )}
      </ProductsSection>
    </div>
  );
};

export default Home;
