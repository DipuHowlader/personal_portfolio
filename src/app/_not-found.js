import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import Preloader from "@/utils/preloader/preloader";


export const metadata = {
  title: "Dipu | Page Not Found",
  description: "The page you're looking for cannot be found.",
};

export const viewport = {
  colorScheme: "dark light",
};

const NotFound = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
      </div>
      <Footer />
      <Menu />
    </Suspense>

  );
};

export default NotFound;