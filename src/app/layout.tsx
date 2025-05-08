import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { OrganizationStructuredData } from "../components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apollo Listing - Doctors Listing",
  description: "Find the right healthcare provider with Apollo Listing. Search among thousands of qualified doctors, specialists, and medical professionals in your area.",
  keywords: "doctors, physicians, healthcare providers, medical specialists, Apollo Listing, find a doctor",
  authors: [{ name: "Apollo Listing Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Apollo Listing - Find the Right Doctor",
    description: "Search qualified healthcare providers and specialists near you with Apollo Listing.",
    url: "https://apollolisting.com",
    siteName: "Apollo Listing",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apollo Listing - Healthcare Provider Directory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apollo Listing - Find the Right Doctor",
    description: "Search qualified healthcare providers and specialists near you with Apollo Listing.",
    images: ["/twitter-image.jpg"],
    creator: "@apollolisting",
  },
  alternates: {
    canonical: "https://apollolisting.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <OrganizationStructuredData />
      </head>
      <body className={inter.className}>
        {children}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
