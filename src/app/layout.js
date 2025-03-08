import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./responsive.scss";
import ClientLayout from "./clientLayout";
import Preloader from "@/utils/preloader/preloader";
// import { Suspense } from "react";

export const metadata = {
  title: "Dipu | Portfolio",
  description:
    "I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in deep learning, computer vision, and natural language processing to help businesses extract insights from data and solve complex problems.",
  charset: "UTF-8",
  icons: {
    icon: [
      { url: "/images/favicon.ico", type: "image/x-icon" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/images/site.webmanifest",
  themeColor: "#ffffff",
  openGraph: {
    type: "website",
    url: "https://aesthetic-druid-a5c893.netlify.app/",
    title: "Transforming Data into Insights: Dipu",
    description:
      "I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in deep learning, computer vision, and natural language processing to help businesses extract insights from data and solve complex problems.",
    images: [
      {
        url: "https://aesthetic-druid-a5c893.netlify.app/path-to-your-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://aesthetic-druid-a5c893.netlify.app/",
    title: "Transforming Data into Insights: Dipu",
    description:
      "I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in deep learning, computer vision, and natural language processing to help businesses extract insights from data and solve complex problems.",
    images: [
      {
        url: "https://aesthetic-druid-a5c893.netlify.app/path-to-your-image.jpg",
      },
    ],
  },
  authors: [{ name: "Dipu" }],
  keywords: [
    "dipu portfolio",
    "machine learning",
    "ML Engineer",
    "Data Scientist",
  ],
  canonical: "https://aesthetic-druid-a5c893.netlify.app/",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Suspense fallback={<Preloader />}> */}
          <ClientLayout>
            <main>{children}</main>
          </ClientLayout>
        {/* </Suspense> */}
      </body>
    </html>
  );
}