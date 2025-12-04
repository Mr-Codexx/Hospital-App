import { useState, useEffect } from 'react';
import DataService from '../utils/dataService';

export const useHospitalData = () => {
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = DataService.getAllData();
        setHospitalData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      const data = DataService.getAllData();
      setHospitalData(data);
      setLoading(false);
    }, 300);
  };

  return {
    hospitalData,
    loading,
    error,
    refreshData,
    // Convenience methods
    getHospitalInfo: () => hospitalData?.hospitalInfo,
    getDepartments: () => hospitalData?.departments || [],
    getDoctors: () => hospitalData?.doctors || [],
    getPatients: () => hospitalData?.patients || [],
    getAppointments: () => hospitalData?.appointments || [],
    getMedicalRecords: () => hospitalData?.medicalRecords || [],
    getBills: () => hospitalData?.bills || [],
    getRooms: () => hospitalData?.rooms || [],
    getPharmacyItems: () => hospitalData?.pharmacy || [],
    getLabTests: () => hospitalData?.labTests || [],
    getEmergencyCases: () => hospitalData?.emergencyCases || [],
    getNotifications: () => hospitalData?.notifications || [],
    getAnalytics: () => hospitalData?.analytics || {},
    
    // Search methods
    searchPatients: DataService.searchPatients,
    searchDoctors: DataService.searchDoctors,
    
    // Statistics
    getStatistics: DataService.getHospitalStatistics,
    
    // Create/Update methods
    createAppointment: DataService.createAppointment,
    createPatient: DataService.createPatient,
    updateAppointmentStatus: DataService.updateAppointmentStatus,
    updateBedStatus: DataService.updateBedStatus,
    
    // Get by ID methods
    getDoctorById: DataService.getDoctorById,
    getPatientById: DataService.getPatientById,
    getDepartmentById: DataService.getDepartmentById,
    getAppointmentById: DataService.getAppointmentById,
    
    // Filter methods
    getAppointmentsByDoctor: DataService.getAppointmentsByDoctor,
    getAppointmentsByPatient: DataService.getAppointmentsByPatient,
    getPatientsByDoctor: DataService.getPatientsByDoctor,
    getMedicalRecordsByPatient: DataService.getMedicalRecordsByPatient,
    getBillsByPatient: DataService.getBillsByPatient,
    getDoctorsByDepartment: DataService.getDoctorsByDepartment,
    getTodaysAppointments: DataService.getTodaysAppointments,
    getPendingBills: DataService.getPendingBills,
    getAvailableBeds: DataService.getAvailableBeds,
    getLowStockItems: DataService.getLowStockItems,
    getActiveEmergencyCases: DataService.getActiveEmergencyCases,
    getUnreadNotifications: DataService.getUnreadNotifications
  };
};