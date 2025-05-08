import React from 'react';

interface OrganizationStructuredDataProps {
  url?: string;
  logo?: string;
  name?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
  sameAs?: string[];
}

export const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({
  url = "https://apollolisting.com",
  logo = "https://apollolisting.com/logo.png",
  name = "Apollo Listing - Healthcare Directory",
  contactPoint = {
    telephone: "+1-800-555-1234",
    contactType: "customer service"
  },
  sameAs = [
    "https://www.facebook.com/apollolisting",
    "https://www.twitter.com/apollolisting",
    "https://www.instagram.com/apollolisting",
    "https://www.linkedin.com/company/apollolisting"
  ]
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url,
    logo,
    name,
    contactPoint,
    sameAs
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface MedicalOrganizationStructuredDataProps {
  name?: string;
  image?: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  url?: string;
  medicalSpecialty?: string[];
}

export const MedicalOrganizationStructuredData: React.FC<MedicalOrganizationStructuredDataProps> = ({
  name = "Apollo Listing Medical Directory",
  image = ["https://apollolisting.com/office-image.jpg"],
  address = {
    streetAddress: "123 Medical Plaza",
    addressLocality: "Cityville",
    addressRegion: "State",
    postalCode: "12345",
    addressCountry: "US"
  },
  geo = {
    latitude: 40.7128,
    longitude: -74.0060
  },
  telephone = "+1-800-555-1234",
  url = "https://apollolisting.com",
  medicalSpecialty = ["Primary Care", "Cardiology", "Neurology", "Pediatrics"]
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name,
    image,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    geo: {
      "@type": "GeoCoordinates",
      ...geo
    },
    telephone,
    url,
    medicalSpecialty
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface DoctorListingStructuredDataProps {
  name: string;
  description: string;
  image: string[];
  medicalSpecialty: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email?: string;
  availableService?: string[];
  url: string;
}

export const DoctorListingStructuredData: React.FC<DoctorListingStructuredDataProps> = ({
  name,
  description,
  image,
  medicalSpecialty,
  address,
  telephone,
  email,
  availableService,
  url
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name,
    description,
    image,
    medicalSpecialty,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    telephone,
    email,
    availableService,
    url
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface LocalBusinessStructuredDataProps {
  name?: string;
  image?: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  url?: string;
  priceRange?: string;
}

export const RealEstateAgencyStructuredData: React.FC<LocalBusinessStructuredDataProps> = ({
  name = "Apollo Listing Real Estate Agency",
  image = ["https://apollolisting.com/office-image.jpg"],
  address = {
    streetAddress: "123 Main Street",
    addressLocality: "Cityville",
    addressRegion: "State",
    postalCode: "12345",
    addressCountry: "US"
  },
  geo = {
    latitude: 40.7128,
    longitude: -74.0060
  },
  telephone = "+1-800-555-1234",
  url = "https://apollolisting.com",
  priceRange = "$$$"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name,
    image,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    geo: {
      "@type": "GeoCoordinates",
      ...geo
    },
    telephone,
    url,
    priceRange
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface PropertyListingStructuredDataProps {
  name: string;
  description: string;
  image: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  numberOfRooms: number;
  floorSize: {
    value: number;
    unitCode: string;
  };
  price: number;
  priceCurrency: string;
  url: string;
}

export const PropertyListingStructuredData: React.FC<PropertyListingStructuredDataProps> = ({
  name,
  description,
  image,
  address,
  numberOfRooms,
  floorSize,
  price,
  priceCurrency,
  url
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name,
    description,
    image,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    numberOfRooms,
    floorSize: {
      "@type": "QuantitativeValue",
      ...floorSize
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency
    },
    url
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}; 