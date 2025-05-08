import React from 'react';
import { PropertyListingStructuredData } from './StructuredData';
import SocialShare from './SocialShare';

interface PropertyDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  bedrooms: number;
  bathrooms: number;
  size: number;
  images: string[];
  slug: string;
}

interface RichPropertyListingProps {
  property: PropertyDetails;
}

const RichPropertyListing: React.FC<RichPropertyListingProps> = ({ property }) => {
  const {
    id,
    title,
    description,
    price,
    currency,
    address,
    bedrooms,
    bathrooms,
    size,
    images,
    slug
  } = property;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://apollolisting.com';
  const propertyUrl = `${baseUrl}/listing/${slug}`;

  return (
    <div className="property-listing">
      {/* Property details UI */}
      <div className="property-details">
        <h1>{title}</h1>
        <p className="property-address">
          {address.streetAddress}, {address.addressLocality}, {address.addressRegion} {address.postalCode}
        </p>
        <div className="property-price">
          {currency === 'USD' ? '$' : currency} {price.toLocaleString()}
        </div>
        <div className="property-features">
          <span>{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          <span>{bathrooms} {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
          <span>{size} sq ft</span>
        </div>
        <div className="property-description">
          {description}
        </div>
      </div>

      {/* Social sharing */}
      <SocialShare 
        title={title}
        url={propertyUrl}
        description={`Check out this property: ${title} - ${currency === 'USD' ? '$' : currency}${price.toLocaleString()}`}
        imageUrl={images.length > 0 ? images[0] : ''}
      />

      {/* Structured data for SEO */}
      <PropertyListingStructuredData 
        name={title}
        description={description}
        image={images}
        address={address}
        numberOfRooms={bedrooms}
        floorSize={{
          value: size,
          unitCode: "SQFT"
        }}
        price={price}
        priceCurrency={currency}
        url={propertyUrl}
      />
    </div>
  );
};

export default RichPropertyListing; 