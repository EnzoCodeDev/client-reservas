import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
// import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
<<<<<<< HEAD
        <Featured/>
        <h1 className="homeTitle">Descubre tu opción ideal</h1>
        <h2 className="homeSubtitle">Lugares o Salas</h2>
        <PropertyList/>
=======
        {/* <Featured/> */}
        {/* <h1 className="homeTitle">Descubre tu opción ideal</h1> */}
        {/* <h2>Lugares o Salas</h2>
        <PropertyList/> */}
>>>>>>> 0426ae60d6137c8cd9770bcd0d31ba494b287c23
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
