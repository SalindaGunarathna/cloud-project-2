import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMapPin, FiSave, FiEdit3 } from 'react-icons/fi';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProfileContainer = styled.div`
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

const ProfileContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProfileCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1rem;
  border: 4px solid rgba(255, 255, 255, 0.3);
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  opacity: 0.9;
  font-size: 1rem;
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f8fafc;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background: #f1f5f9;
    color: #64748b;
    cursor: not-allowed;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  z-index: 1;
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  align-self: flex-start;

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

const EditButton = styled.button`
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  &:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.875rem;
  text-align: center;
  background: #f0fdf4;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #bbf7d0;
  margin-bottom: 1rem;
`;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    street: user?.address?.street || '',
    postalCode: user?.address?.postalCode || '',
    city: user?.address?.city || '',
    country: user?.address?.country || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      street: user?.address?.street || '',
      postalCode: user?.address?.postalCode || '',
      city: user?.address?.city || '',
      country: user?.address?.country || ''
    });
    setSuccess('');
  };

  return (
    <ProfileContainer>
      <Header>
        <HeaderContent>
          <Title>My Profile</Title>
          <Subtitle>Manage your account information and preferences</Subtitle>
        </HeaderContent>
      </Header>

      <ProfileContent>
        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CardHeader>
            <Avatar>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <UserName>{user?.email?.split('@')[0] || 'User'}</UserName>
            <UserEmail>{user?.email || 'user@example.com'}</UserEmail>
          </CardHeader>

          <CardBody>
            <SectionTitle>
              <FiUser />
              Personal Information
            </SectionTitle>

            {success && <SuccessMessage>{success}</SuccessMessage>}

            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Street Address</Label>
                  <InputIcon>
                    <FiMapPin size={16} />
                  </InputIcon>
                  <Input
                    type="text"
                    name="street"
                    placeholder="Enter street address"
                    value={formData.street}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Postal Code</Label>
                  <InputIcon>
                    <FiMapPin size={16} />
                  </InputIcon>
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="Enter postal code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>City</Label>
                  <InputIcon>
                    <FiMapPin size={16} />
                  </InputIcon>
                  <Input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Country</Label>
                  <InputIcon>
                    <FiMapPin size={16} />
                  </InputIcon>
                  <Input
                    type="text"
                    name="country"
                    placeholder="Enter country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </FormGroup>
              </FormRow>

              <ButtonGroup>
                {isEditing ? (
                  <>
                    <SaveButton type="submit" disabled={loading}>
                      <FiSave />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </SaveButton>
                    <EditButton type="button" onClick={handleCancel}>
                      Cancel
                    </EditButton>
                  </>
                ) : (
                  <EditButton onClick={handleEdit}>
                    <FiEdit3 />
                    Edit Profile
                  </EditButton>
                )}
              </ButtonGroup>
            </Form>
          </CardBody>
        </ProfileCard>

        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CardBody>
            <SectionTitle>
              <FiPhone />
              Account Details
            </SectionTitle>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Email:</span>
                <span style={{ fontWeight: '500' }}>{user?.email || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Phone:</span>
                <span style={{ fontWeight: '500' }}>{user?.phone || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Role:</span>
                <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>{user?.role || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                <span style={{ color: '#64748b' }}>Member Since:</span>
                <span style={{ fontWeight: '500' }}>
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </CardBody>
        </ProfileCard>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;
