import hospitalData from '../data/HospitalData.json';

class DataService {
  // Get all data
  static getAllData() {
    return hospitalData;
  }

  // Hospital Info
  static getHospitalInfo() {
    return hospitalData.hospitalInfo;
  }

  // Departments
  static getDepartments() {
    return hospitalData.departments;
  }

  static getDepartmentById(id) {
    return hospitalData.departments.find(dept => dept.id === id);
  }

  // Doctors
  static getDoctors() {
    return hospitalData.doctors;
  }

  static getDoctorById(id) {
    return hospitalData.doctors.find(doctor => doctor.id === id);
  }

  static getDoctorsByDepartment(department) {
    return hospitalData.doctors.filter(doctor => doctor.department === department);
  }

  // Patients
  static getPatients() {
    return hospitalData.patients;
  }

  static getPatientById(id) {
    return hospitalData.patients.find(patient => patient.id === id);
  }

  static getPatientsByDoctor(doctorId) {
    return hospitalData.patients.filter(patient => patient.primaryDoctor === doctorId);
  }

  // Appointments
  static getAppointments() {
    return hospitalData.appointments;
  }

  static getAppointmentById(id) {
    return hospitalData.appointments.find(appointment => appointment.id === id);
  }

  static getAppointmentsByPatient(patientId) {
    return hospitalData.appointments.filter(appointment => appointment.patientId === patientId);
  }

  static getAppointmentsByDoctor(doctorId) {
    return hospitalData.appointments.filter(appointment => appointment.doctorId === doctorId);
  }

  static getTodaysAppointments() {
    const today = new Date().toISOString().split('T')[0];
    return hospitalData.appointments.filter(appointment => appointment.date === today);
  }

  // Medical Records
  static getMedicalRecords() {
    return hospitalData.medicalRecords;
  }

  static getMedicalRecordsByPatient(patientId) {
    return hospitalData.medicalRecords.filter(record => record.patientId === patientId);
  }

  // Bills
  static getBills() {
    return hospitalData.bills;
  }

  static getBillsByPatient(patientId) {
    return hospitalData.bills.filter(bill => bill.patientId === patientId);
  }

  static getPendingBills() {
    return hospitalData.bills.filter(bill => bill.status === 'pending');
  }

  // Rooms
  static getRooms() {
    return hospitalData.rooms;
  }

  static getAvailableBeds() {
    const availableBeds = [];
    hospitalData.rooms.forEach(room => {
      room.beds.forEach(bed => {
        if (bed.status === 'available') {
          availableBeds.push({
            roomId: room.id,
            roomNumber: room.roomNumber,
            roomType: room.type,
            bedNumber: bed.bedNumber,
            department: room.department
          });
        }
      });
    });
    return availableBeds;
  }

  // Pharmacy
  static getPharmacyItems() {
    return hospitalData.pharmacy;
  }

  static getMedicineById(id) {
    return hospitalData.pharmacy.find(medicine => medicine.id === id);
  }

  static getLowStockItems(threshold = 100) {
    return hospitalData.pharmacy.filter(item => item.stock < threshold);
  }

  // Lab Tests
  static getLabTests() {
    return hospitalData.labTests;
  }

  // Emergency Cases
  static getEmergencyCases() {
    return hospitalData.emergencyCases;
  }

  static getActiveEmergencyCases() {
    return hospitalData.emergencyCases.filter(caseItem => 
      caseItem.status !== 'Discharged' && caseItem.status !== 'Transferred'
    );
  }

  // Notifications
  static getNotifications() {
    return hospitalData.notifications;
  }

  static getUnreadNotifications(userId) {
    return hospitalData.notifications.filter(notification => 
      notification.userId === userId && !notification.read
    );
  }

  // Analytics
  static getAnalytics() {
    return hospitalData.analytics;
  }

  // Search
  static searchPatients(query) {
    const searchTerm = query.toLowerCase();
    return hospitalData.patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm) ||
      patient.medicalRecordNumber.toLowerCase().includes(searchTerm) ||
      patient.contact.phone.includes(searchTerm)
    );
  }

  static searchDoctors(query) {
    const searchTerm = query.toLowerCase();
    return hospitalData.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm) ||
      doctor.specialization.toLowerCase().includes(searchTerm) ||
      doctor.department.toLowerCase().includes(searchTerm)
    );
  }

  // Statistics
  static getHospitalStatistics() {
    return {
      totalDoctors: hospitalData.doctors.length,
      totalPatients: hospitalData.patients.length,
      totalAppointments: hospitalData.appointments.length,
      activeAppointments: hospitalData.appointments.filter(apt => apt.status === 'scheduled').length,
      totalBeds: hospitalData.rooms.reduce((total, room) => total + room.beds.length, 0),
      occupiedBeds: hospitalData.rooms.reduce((total, room) => {
        const occupied = room.beds.filter(bed => bed.status === 'occupied').length;
        return total + occupied;
      }, 0),
      pendingBills: hospitalData.bills.filter(bill => bill.status === 'pending').length,
      totalRevenue: hospitalData.bills
        .filter(bill => bill.status === 'paid')
        .reduce((total, bill) => total + bill.grandTotal, 0)
    };
  }

  // Create new records (simulated)
  static createAppointment(appointmentData) {
    const newAppointment = {
      id: `APT${String(hospitalData.appointments.length + 1).padStart(3, '0')}`,
      ...appointmentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, this would be an API call
    // For now, we'll just log it
    console.log('New appointment created:', newAppointment);
    return newAppointment;
  }

  static createPatient(patientData) {
    const newPatient = {
      id: `PAT${String(hospitalData.patients.length + 1).padStart(3, '0')}`,
      medicalRecordNumber: `MRN00${String(hospitalData.patients.length + 1234)}`,
      status: 'active',
      registrationDate: new Date().toISOString().split('T')[0],
      ...patientData
    };
    
    console.log('New patient registered:', newPatient);
    return newPatient;
  }

  static updateAppointmentStatus(appointmentId, status) {
    const appointment = hospitalData.appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      appointment.status = status;
      appointment.updatedAt = new Date().toISOString();
      console.log(`Appointment ${appointmentId} status updated to: ${status}`);
      return appointment;
    }
    return null;
  }

  static updateBedStatus(roomId, bedNumber, status, patientId = null) {
    const room = hospitalData.rooms.find(r => r.id === roomId);
    if (room) {
      const bed = room.beds.find(b => b.bedNumber === bedNumber);
      if (bed) {
        bed.status = status;
        bed.patientId = patientId;
        if (status === 'occupied' && patientId) {
          bed.admissionDate = new Date().toISOString().split('T')[0];
        } else if (status === 'available') {
          bed.patientId = null;
          bed.admissionDate = null;
          bed.expectedDischarge = null;
        }
        console.log(`Bed ${bedNumber} in Room ${room.roomNumber} updated: ${status}`);
        return bed;
      }
    }
    return null;
  }
}

export default DataService;