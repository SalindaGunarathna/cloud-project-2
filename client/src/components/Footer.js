import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #1e293b;
  color: #f1f5f9;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #f8fafc;
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
  }

  p {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #60a5fa;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #334155;
  color: #f1f5f9;
  transition: all 0.2s ease;

  &:hover {
    background: #60a5fa;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding-top: 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>ShopHub</h3>
          <p>Your one-stop destination for all your shopping needs. Discover amazing products, great deals, and exceptional service.</p>
          <SocialLinks>
            <SocialLink href="#" aria-label="Twitter">
              <FiTwitter size={20} />
            </SocialLink>
            <SocialLink href="#" aria-label="Facebook">
              <FiFacebook size={20} />
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <FiInstagram size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/products">Products</Link></p>
          <p><Link to="/about">About Us</Link></p>
          <p><Link to="/contact">Contact</Link></p>
        </FooterSection>

        <FooterSection>
          <h3>Customer Service</h3>
          <p><Link to="/help">Help Center</Link></p>
          <p><Link to="/shipping">Shipping Info</Link></p>
          <p><Link to="/returns">Returns</Link></p>
          <p><Link to="/faq">FAQ</Link></p>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <p>
            <FiMapPin style={{ marginRight: '0.5rem', display: 'inline' }} />
            123 Shopping St, E-commerce City, EC 12345
          </p>
          <p>
            <FiPhone style={{ marginRight: '0.5rem', display: 'inline' }} />
            +1 (555) 123-4567
          </p>
          <p>
            <FiMail style={{ marginRight: '0.5rem', display: 'inline' }} />
            support@shophub.com
          </p>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2024 ShopHub. All rights reserved. | Privacy Policy | Terms of Service</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
