import { useHospitalDataContext } from '../context/HospitalDataContext';

const DoctorsList = () => {
  const { getDoctors, loading } = useHospitalDataContext();

  if (loading) return <div>Loading...</div>;

  const doctors = getDoctors();

  return (
    <div>
      {doctors.map(doctor => (
        <div key={doctor.id}>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialization}</p>
          <p>Experience: {doctor.experience}</p>
          <p>Fee: {doctor.availability.consultationFee}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorsList;