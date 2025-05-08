# Apollo Listing Clone

A feature-rich clone of the Apollo247 destination page for General Physicians/Internal Medicine, built with Next.js, MongoDB, and a modern React stack. This project demonstrates advanced frontend and backend integration, off-page SEO, and a robust doctor listing/filtering experience.

## Project Overview

This project is a clone of the [Apollo247 General Physician/Internal Medicine page](https://www.apollo247.com/specialties/general-physician-internal-medicine), focusing on the destination page only. It includes a functional doctor listing, advanced filters, and a header. The backend is built with REST APIs and MongoDB, and the frontend leverages Next.js for server-side rendering and SEO.

### Requirements Fulfilled

- **Destination Page Only**: Implements the doctor's listing, filters, and header for the specified page.
- **Backend with REST APIs**: 
  - `POST /api/doctor` – Add a new doctor.
  - `GET /api/doctor` – List doctors with filters and pagination.
- **Database**: Uses MongoDB (NoSQL) via Mongoose.
- **Functional Filters**: Only filters are interactive; other UI elements are present but non-functional as per requirements.
- **Off-page SEO**: Implemented for the destination page using Next.js metadata, structured data, and sitemap generation.

---

## Features

- **Doctor Listing with Filters**: 
  - Filter by experience, fees, language, and facility.
  - Real-time updates using SWR for data fetching and caching.
- **Pagination**: 
  - Server-side pagination for efficient data loading.
  - Pagination UI for easy navigation.
- **Add Doctor API**: 
  - Secure endpoint to add new doctors to the database.
- **RESTful Backend**: 
  - Built with Next.js API routes and Mongoose for MongoDB.
- **Caching & Data Fetching**: 
  - Uses SWR for client-side caching, revalidation, and mutation.
- **Off-page SEO**: 
  - Dynamic metadata, Open Graph, Twitter cards, and structured data (JSON-LD).
  - Automated sitemap generation and search engine pinging.
- **Responsive Design**: 
  - Fully responsive and mobile-friendly UI using Tailwind CSS.
- **Modern UI/UX**: 
  - Clean, accessible, and user-friendly interface.
- **Toast Notifications**: 
  - User feedback for actions like adding a doctor.
- **TypeScript**: 
  - Type-safe codebase for both frontend and backend.
- **Code Organization**: 
  - Modular structure with reusable components and hooks.
- **No Business Logic on Non-filter UI**: 
  - All other UI elements are present for visual completeness but are non-interactive as required.

---

## Tech Stack

- **Frontend**: Next.js, React, SWR, Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes, Mongoose, MongoDB
- **SEO**: Next.js Metadata API, Structured Data, Sitemap Scripts
- **Other**: Axios, React Toastify, Lucide React Icons

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd apollo_listing_clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## API Endpoints

- **Add Doctor**
  - `POST /api/doctor`
  - Body: Doctor details (JSON)
- **List Doctors with Filters & Pagination**
  - `GET /api/doctor?experience=...&fees=...&language=...&facility=...&page=1&limit=10`

---

## Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run start` – Start the production server
- `npm run seo-update` – Generate sitemap and ping search engines

---

## Acknowledgements

- [Apollo247](https://www.apollo247.com/) for the original design inspiration.
- [Next.js](https://nextjs.org/), [MongoDB](https://www.mongodb.com/), [SWR](https://swr.vercel.app/), [Tailwind CSS](https://tailwindcss.com/).

---

## License

This project is for educational and demonstration purposes only.