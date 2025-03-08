import { Suspense } from "react"; // Import Suspense if you want to handle async rendering
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Portfolio from "@/components/portfolio";
import Preloader from "@/utils/preloader/preloader";


export const metadata = {
  title: "Dipu | Portfolio",
  description:
    "I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in  deep learning, computer vision, natural language processing to help businesses extract insights from data and solve complex problems.",
};

const PortfolioPage = () => {
  return (
      <Suspense fallback={<Preloader />}>
      <Navbar />
          <Portfolio />
          <Footer />
          <Menu />
      </Suspense>
  );
};

export default PortfolioPage;
