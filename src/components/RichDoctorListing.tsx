import React from 'react';
import { DoctorListingStructuredData } from './StructuredData';
import SocialShare from './SocialShare';

interface DoctorDetails {
  id: string;
  name: string;
  title: string;
  description: string;
  specialties: string[];
  education: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  acceptingNewPatients: boolean;
  services: string[];
  images: string[];
  slug: string;
}

interface RichDoctorListingProps {
  doctor: DoctorDetails;
}

const RichDoctorListing: React.FC<RichDoctorListingProps> = ({ doctor }) => {
  const {
    id,
    name,
    title,
    description,
    specialties,
    education,
    address,
    telephone,
    email,
    acceptingNewPatients,
    services,
    images,
    slug
  } = doctor;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://apollolisting.com';
  const doctorUrl = `${baseUrl}/doctor/${slug}`;

  return (
    <div className="doctor-listing">
      {/* Doctor details UI */}
      <div className="doctor-details">
        <h1>{name}, {title}</h1>
        <p className="doctor-specialties">
          {specialties.join(' • ')}
        </p>
        <div className="doctor-address">
          {address.streetAddress}, {address.addressLocality}, {address.addressRegion} {address.postalCode}
        </div>
        <div className="doctor-contact">
          <div>Phone: {telephone}</div>
          <div>Email: {email}</div>
        </div>
        <div className="doctor-status">
          {acceptingNewPatients 
            ? <span className="accepting-patients">Accepting New Patients</span> 
            : <span className="not-accepting-patients">Not Accepting New Patients</span>
          }
        </div>
        <div className="doctor-education">
          <h3>Education & Training</h3>
          <ul>
            {education.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>
        </div>
        <div className="doctor-services">
          <h3>Services</h3>
          <ul>
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="doctor-description">
          <h3>About Dr. {name.split(' ')[1]}</h3>
          {description}
        </div>
      </div>

      {/* Social sharing */}
      <SocialShare 
        title={`Dr. ${name} - ${specialties[0]}`}
        url={doctorUrl}
        description={`Learn more about Dr. ${name} - ${specialties.join(', ')}`}
        imageUrl={images.length > 0 ? images[0] : ''}
      />

      {/* Structured data for SEO */}
      <DoctorListingStructuredData 
        name={name}
        description={description}
        image={images}
        medicalSpecialty={specialties}
        address={address}
        telephone={telephone}
        email={email}
        availableService={services}
        url={doctorUrl}
      />
    </div>
  );
};

export default RichDoctorListing; 