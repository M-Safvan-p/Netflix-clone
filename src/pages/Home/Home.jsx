import HeroBanner from "../../components/Home/HeroBanner";
import MovieList from "../../components/Home/MovieList";
import FooterLanding from "../../components/layout/FooterLanding";

const Home = () => {
  return (
    <div className="text-white bg-[#161616]">
      <HeroBanner />
      <div className="relative z-10 bg-[#161616] pt-6 mb-20">
        <MovieList />
      </div>
      <FooterLanding />
    </div>
  );
};

export default Home;
