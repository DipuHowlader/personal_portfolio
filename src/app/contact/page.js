import Footer from "@/components/footer";
import ContactSection from "@/components/contact";
import Navbar from "@/components/navbar";
import Menu from "@/components/menu";


export const metadata = {
  title: "Dipu | Contact",
  description:
    "I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in  deep learning, computer vision, natural language processing to help businesses extract insights from data and solve complex problems.",
};


const ContactPage = () => {
  return (
    <>
      <Navbar />
      <ContactSection />
      <Footer />
      <Menu />
    </>
  );
};

export default ContactPage;
