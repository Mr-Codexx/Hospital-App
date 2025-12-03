import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import VerifyOTP from '../pages/auth/VerifyOTP';

// Patient Pages
import PatientDashboard from '../pages/patient/Dashboard';
import PatientAppointments from '../pages/patient/Appointments';
import PatientProfile from '../pages/patient/Profile';
import PatientReports from '../pages/patient/Reports';
import PatientPrescriptions from '../pages/patient/Prescriptions';

// Doctor Pages
import DoctorDashboard from '../pages/doctor/Dashboard';
import DoctorPatients from '../pages/doctor/Patients';
import DoctorAppointments from '../pages/doctor/Appointments';
import DoctorEMR from '../pages/doctor/EMR';
import DoctorReports from '../pages/doctor/Reports';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminDoctors from '../pages/admin/Doctors';
import AdminAppointments from '../pages/admin/Appointments';
import AdminDepartments from '../pages/admin/Departments';
import AdminBilling from '../pages/admin/Billing';
import AdminReports from '../pages/admin/Analytics';

// Staff Pages
import StaffRegisterPatient from '../pages/staff/RegisterPatient';
import StaffBookAppointment from '../pages/staff/BookAppointment';
import StaffReports from '../pages/staff/Reports';

// Shared Pages
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import LandingPage from '../pages/LandingPage';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  // Helper function to get default route based on role
  const getDefaultRoute = (role) => {
    switch (role) {
      case 'patient': return '/patient/dashboard';
      case 'doctor': return '/doctor/dashboard';
      case 'admin': return '/admin/dashboard';
      case 'staff': return '/staff/register-patient';
      default: return '/login';
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!user ? <Login /> : <Navigate to={getDefaultRoute(user.role)} replace />} />
        <Route path="/verify-otp" element={!user ? <VerifyOTP /> : <Navigate to={getDefaultRoute(user.role)} replace />} />
      </Route>

      {/* Root redirect based on authentication */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={
        !user ? (
          <Navigate to="/login" replace />
        ) : (
          <Navigate to={getDefaultRoute(user.role)} replace />
        )
      } />

      {/* Protected Routes with Role-Based Layout */}
      <Route element={<MainLayout />}>
        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/patient/appointments" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientAppointments />
          </ProtectedRoute>
        } />
        <Route path="/patient/profile" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientProfile />
          </ProtectedRoute>
        } />
        <Route path="/patient/reports" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientReports />
          </ProtectedRoute>
        } />
        <Route path="/patient/prescriptions" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientPrescriptions />
          </ProtectedRoute>
        } />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/doctor/patients" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorPatients />
          </ProtectedRoute>
        } />
        <Route path="/doctor/appointments" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorAppointments />
          </ProtectedRoute>
        } />
        <Route path="/doctor/emr/:patientId" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorEMR />
          </ProtectedRoute>
        } />
        <Route path="/doctor/reports" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorReports />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/doctors" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDoctors />
          </ProtectedRoute>
        } />
        <Route path="/admin/appointments" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminAppointments />
          </ProtectedRoute>
        } />
        <Route path="/admin/departments" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDepartments />
          </ProtectedRoute>
        } />
        <Route path="/admin/billing" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminBilling />
          </ProtectedRoute>
        } />
        <Route path="/admin/analytics" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminReports />
          </ProtectedRoute>
        } />

        {/* Staff Routes */}
        <Route path="/staff/register-patient" element={
          <ProtectedRoute allowedRoles={['staff']}>
            <StaffRegisterPatient />
          </ProtectedRoute>
        } />
        <Route path="/staff/book-appointment" element={
          <ProtectedRoute allowedRoles={['staff']}>
            <StaffBookAppointment />
          </ProtectedRoute>
        } />
        <Route path="/staff/upload-reports" element={
          <ProtectedRoute allowedRoles={['staff']}>
            <StaffReports />
          </ProtectedRoute>
        } />

        {/* Common Error Pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;