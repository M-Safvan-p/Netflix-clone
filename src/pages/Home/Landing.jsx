import Background from "../../assets/images/netflix-bg.jpg";
import Header from "../../components/layout/Header";
import HeroContent from "../../components/Landing/HeroContent";
import TrendingMovies from "../../components/Movie/Trending/TrendingCarousel";
import ReasonCardSet from "../../components/Landing/ReasonCardSet";
import FAQAccordion from "../../components/Landing/FAQAccordion";
import { FAQS } from "../../utils/FAQs";
import Footer from "../../components/layout/FooterLanding";

const Landing = () => {
  return (
    <div className="text-white bg-black">
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <Header />
        <div className="flex justify-center h-screen items-center">
          <HeroContent />
        </div>
      </section>

      <section className="px-6 md:px-20">
        <TrendingMovies />
        <ReasonCardSet />
        <FAQAccordion items={FAQS} />
        <Footer />
      </section>
    </div>
  );
};

export default Landing;
