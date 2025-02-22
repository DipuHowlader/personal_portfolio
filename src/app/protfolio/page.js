import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protfolio from "@/components/protfolio";

export const metadata = {
  title: "Dipu | Protfolio",
  description:
    "I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in  deep learning, computer vision, natural language processing to help businesses extract insights from data and solve complex problems.",
};


const ProtfolioPage = () => {
  return (
    <>
      <Navbar />
      <Protfolio />
      <Footer />
      <Menu />
    </>
  );
};

export default ProtfolioPage;
