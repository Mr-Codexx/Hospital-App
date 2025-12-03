import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast, Box, Text, Badge, } from '@chakra-ui/react';

const AuthContext = createContext({});

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  STAFF: 'staff',
  PATIENT: 'patient',
};

// Enhanced test users with more details
const testUsers = {
  '+911234567890': {
    id: 'PAT001',
    name: 'Pavan Ponnella',
    phone: '+911234567890',
    role: ROLES.PATIENT,
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    email: 'john.smith@email.com',
    address: '123 Main Street, New York',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=805AD5&color=fff',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-01-25',
  },
  '+911234567891': {
    id: 'DOC001',
    name: 'Dr. Suman Dixit',
    phone: '+911234567891',
    role: ROLES.DOCTOR,
    department: 'Cardiology',
    specialization: 'Cardiologist',
    experience: '12 years',
    email: 'sarah.johnson@hospital.com',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3182CE&color=fff',
    qualifications: 'MD, Cardiology',
    consultationFee: '$150',
    availability: 'Mon-Fri, 9AM-5PM',
  },
  '+911234567892': {
    id: 'ADM001',
    name: 'Admin User',
    phone: '+911234567892',
    role: ROLES.ADMIN,
    email: 'admin@hospital.com',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=E53E3E&color=fff',
    permissions: ['all'],
    lastLogin: new Date().toISOString(),
  },
  '+911234567893': {
    id: 'STA001',
    name: 'Reception Staff',
    phone: '+911234567893',
    role: ROLES.STAFF,
    email: 'staff@hospital.com',
    avatar: 'https://ui-avatars.com/api/?name=Reception+Staff&background=38A169&color=fff',
    department: 'Reception',
    shift: 'Morning (9AM-5PM)',
    permissions: ['register_patient', 'book_appointment', 'upload_reports'],
  },
  // Additional test patients
  '+911234567894': {
    id: 'PAT002',
    name: 'Emma Wilson',
    phone: '+911234567894',
    role: ROLES.PATIENT,
    age: 32,
    gender: 'Female',
    bloodType: 'A+',
    email: 'emma.wilson@email.com',
    conditions: ['Asthma', 'Migraine'],
    avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=805AD5&color=fff',
  },
  '+911234567895': {
    id: 'PAT003',
    name: 'Robert Brown',
    phone: '+911234567895',
    role: ROLES.PATIENT,
    age: 58,
    gender: 'Male',
    bloodType: 'B+',
    email: 'robert.brown@email.com',
    conditions: ['Arthritis', 'High Cholesterol'],
    avatar: 'https://ui-avatars.com/api/?name=Robert+Brown&background=805AD5&color=fff',
  },
};

const generateDummyOTP = () => {
  return '123456'; // Static OTP for demo
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpSession, setOtpSession] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('hms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const sendOTP = (phone) => {
    const user = testUsers[phone];
    const otp = generateDummyOTP();
    
    setOtpSession({ phone, otp, userExists: !!user });
    
    toast({
      title: 'OTP Sent Successfully',
      description: (
        <Box>
          <Text>Demo OTP: <Badge colorScheme="green">{otp}</Badge></Text>
          <Text fontSize="sm" mt={1}>
            {user ? `Logging in as ${user.name} (${user.role})` : 'New user registration'}
          </Text>
        </Box>
      ),
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
    
    return Promise.resolve({ success: true, otp });
  };

  const verifyOTP = (phone, enteredOTP) => {
    if (!otpSession || otpSession.phone !== phone) {
      toast({
        title: 'OTP session expired',
        description: 'Please request OTP again',
        status: 'error',
        duration: 3000,
      });
      return false;
    }

    if (enteredOTP !== otpSession.otp) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter correct OTP: 123456',
        status: 'error',
        duration: 3000,
      });
      return false;
    }

    let user = testUsers[phone];
    
    if (!user) {
      // Register new patient
      user = {
        id: `PAT${Date.now().toString().slice(-4)}`,
        name: 'New Patient',
        phone,
        role: ROLES.PATIENT,
        age: 0,
        gender: 'Male',
        bloodType: 'Unknown',
        email: '',
        address: '',
        conditions: [],
        avatar: `https://ui-avatars.com/api/?name=New+Patient&background=805AD5&color=fff`,
        createdAt: new Date().toISOString(),
      };
      testUsers[phone] = user;
    }

    setUser(user);
    localStorage.setItem('hms_user', JSON.stringify(user));
    
    toast({
      title: 'Login Successful!',
      description: `Welcome ${user.name} (${user.role})`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setOtpSession(null);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out',
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

  // Function to switch between test users quickly
  const switchUser = (phone) => {
    const user = testUsers[phone];
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        sendOTP,
        verifyOTP,
        logout,
        updateProfile,
        switchUser,
        testUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);