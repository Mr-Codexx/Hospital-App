import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast, Box, Text, Badge, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from '@chakra-ui/react';
import usersData from '../data/users.json';
import LoginModal from '../components/LoginModal';

const AuthContext = createContext({});

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  STAFF: 'staff',
  PATIENT: 'patient',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginCallback, setLoginCallback] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const storedUser = localStorage.getItem('hms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Unified login function
  const login = ({ email, phone, password, otp, method = 'password' }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (method === 'password') {
          // Find user by email/phone and password
          const foundUser = usersData.users.find(u => 
            (u.email === email || u.phone === phone) && u.password === password
          );
          
          if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('hms_user', JSON.stringify(foundUser));
            localStorage.setItem('hms_token', 'mock-jwt-token');
            
            toast({
              title: 'Login Successful!',
              description: `Welcome back, ${foundUser.name}`,
              status: 'success',
              duration: 3000,
            });
            
            resolve(foundUser);
          } else {
            reject(new Error('Invalid credentials'));
          }
        } else if (method === 'otp') {
          // OTP login logic
          const foundUser = usersData.users.find(u => u.phone === phone);
          if (otp === '123456' && foundUser) {
            setUser(foundUser);
            localStorage.setItem('hms_user', JSON.stringify(foundUser));
            
            toast({
              title: 'Login Successful!',
              description: `Welcome ${foundUser.name}`,
              status: 'success',
              duration: 3000,
            });
            
            resolve(foundUser);
          } else {
            reject(new Error('Invalid OTP'));
          }
        }
      }, 1000);
    });
  };

  // Function to trigger login modal with callback
  const requireLogin = (callback = null) => {
    setLoginCallback(() => callback);
    setIsLoginModalOpen(true);
    onOpen();
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
    onClose();
    
    if (loginCallback && typeof loginCallback === 'function') {
      loginCallback(userData);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
    localStorage.removeItem('hms_token');
    
    toast({
      title: 'Logged out successfully',
      status: 'info',
      duration: 2000,
    });
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('hms_user', JSON.stringify(updatedUser));
    
    toast({
      title: 'Profile Updated',
      status: 'success',
      duration: 3000,
    });
  };

  // Quick switch between test users
  const switchUser = (userId) => {
    const user = usersData.users.find(u => u.id === userId);
    if (user) {
      setUser(user);
      localStorage.setItem('hms_user', JSON.stringify(user));
      
      toast({
        title: 'Switched User',
        description: `Now logged in as ${user.name}`,
        status: 'info',
        duration: 2000,
      });
    }
  };

  const getAllUsers = () => usersData.users;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateProfile,
        switchUser,
        getAllUsers,
        requireLogin,
        isLoginModalOpen,
        setIsLoginModalOpen,
      }}
    >
      {children}
      
      {/* Global Login Modal */}
      {isOpen && (
        <LoginModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setIsLoginModalOpen(false);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);