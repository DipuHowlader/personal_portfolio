import { Suspense } from "react"; 
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact";
import Menu from "@/components/menu";
import Preloader from "@/utils/preloader/preloader";


export const metadata = {
  title: "Dipu | Contact",
  description:
    "I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in deep learning, computer vision, and natural language processing to help businesses extract insights from data and solve complex problems.",
};


const ContactPage = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Navbar />
      <ContactSection />
      <Footer />
      <Menu />
    </Suspense>
  );
};

export default ContactPage;