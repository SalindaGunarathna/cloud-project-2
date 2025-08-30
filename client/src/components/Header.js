import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiLogOut } from 'react-icons/fi';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #667eea;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CartButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  color: #475569;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    transform: scale(1.05);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #f1f5f9;
  color: #475569;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.2s ease;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #475569;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #fef2f2;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #475569;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1001;
  padding: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavLink = styled(Link)`
  font-size: 1.25rem;
  color: #475569;
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
`;

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">ShopHub</Logo>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/orders">Orders</NavLink>
            </>
          )}
        </NavLinks>

        <RightSection>
          <CartButton to="/cart">
            <FiShoppingCart size={20} />
            {isAuthenticated && getCartCount() > 0 && (
              <CartBadge>{getCartCount()}</CartBadge>
            )}
          </CartButton>

          {isAuthenticated ? (
            <UserMenu>
              <UserButton onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <FiUser size={16} />
                {user?.email?.split('@')[0] || 'User'}
              </UserButton>
              
              <DropdownMenu isOpen={isUserMenuOpen}>
                <DropdownItem to="/profile" onClick={() => setIsUserMenuOpen(false)}>
                  <FiUser size={16} />
                  Profile
                </DropdownItem>
                <DropdownItem to="/orders" onClick={() => setIsUserMenuOpen(false)}>
                  <FiHeart size={16} />
                  Orders
                </DropdownItem>
                <LogoutButton onClick={handleLogout}>
                  <FiLogOut size={16} />
                  Logout
                </LogoutButton>
              </DropdownMenu>
            </UserMenu>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
            <FiMenu />
          </MobileMenuButton>
        </RightSection>
      </Nav>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuHeader>
          <Logo to="/" onClick={closeMobileMenu}>ShopHub</Logo>
          <button onClick={closeMobileMenu}>
            <FiX size={24} />
          </button>
        </MobileMenuHeader>
        
        <MobileNavLinks>
          <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
          <MobileNavLink to="/products" onClick={closeMobileMenu}>Products</MobileNavLink>
          {isAuthenticated ? (
            <>
              <MobileNavLink to="/cart" onClick={closeMobileMenu}>Cart</MobileNavLink>
              <MobileNavLink to="/wishlist" onClick={closeMobileMenu}>Wishlist</MobileNavLink>
              <MobileNavLink to="/orders" onClick={closeMobileMenu}>Orders</MobileNavLink>
              <MobileNavLink to="/profile" onClick={closeMobileMenu}>Profile</MobileNavLink>
              <button 
                onClick={() => { handleLogout(); closeMobileMenu(); }}
                style={{ 
                  fontSize: '1.25rem', 
                  color: '#ef4444', 
                  background: 'none', 
                  border: 'none', 
                  padding: '1rem 0', 
                  borderBottom: '1px solid #e2e8f0',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <MobileNavLink to="/login" onClick={closeMobileMenu}>Login</MobileNavLink>
          )}
        </MobileNavLinks>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
