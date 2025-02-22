import About from "@/components/about";
import Protfolio from "@/components/project_study";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Menu from "@/components/menu";


import "../app/style.scss";

export const metadata = {
  title: "Dipu | Home",
  description:
    "I am a Machine Learning Developer with a passion for building intelligent systems. I leverage my expertise in  deep learning, computer vision, natural language processing to help businesses extract insights from data and solve complex problems.",
};

const HomePage = () => {
  return (<>
  <Header />
  <About />
  <Protfolio />
  <Footer />
  <Menu />
  
  </>
  );
};

export default HomePage;
