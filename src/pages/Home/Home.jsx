// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import hero_title from "../../assets/hero_title.png";
// import play_icon from "../../assets/play_icon.png";
// import info_icon from "../../assets/info_icon.png";
// import TitleCards from "../../components/TitleCards/TitleCards";
// import Footer from "../../components/layout/FooterLanding";
// import { getRandomMovie } from "../../services/tmdb.service";

// const Home = () => {
//   const [heroMovie, setHeroMovie] = useState(null);

//   useEffect(() => {
//     async function getHeroMovie() {
//       try {
//         const movie = await getRandomMovie();
//         setHeroMovie(movie);
//       } catch (error) {
//         console.error("Error fetching hero movie:", error);
//       }
//     }

//     getHeroMovie();
//   }, []);

//   return (
//     <div className="home">
//       <Navbar />

//       <div className="relative">
//         {heroMovie && (
//           <img
//             src={`https://image.tmdb.org/t/p/original${heroMovie.poster_path}`}
//             alt={heroMovie.title}
//             className="w-full"
//             style={{
//               maskImage: "linear-gradient(to right, transparent, black 75%)",
//               WebkitMaskImage:
//                 "linear-gradient(to right, transparent, black 75%)",
//             }}
//           />
//         )}

//         <div className="absolute bottom-0 w-full pl-[6%]">
//           <img
//             src={hero_title}
//             alt=""
//             className="w-[90%] max-w-[420px] mb-[30px]"
//           />

//           <p className="max-w-[700px] text-[17px] mb-[20px]">
//             Discovering his ties to a secret ancient order, a young man living
//             in modern Istanbul embarks on a quest to save the city from an
//             immortal enemy.
//           </p>

//           <div className="flex gap-[10px] mb-[50px]">
//             <button className="flex items-center gap-[10px] px-[20px] py-[8px] text-[15px] font-semibold bg-white rounded cursor-pointer hover:bg-[#ffffffbf]">
//               <img src={play_icon} alt="" className="w-[25px]" />
//               Play
//             </button>

//             <button className="flex items-center gap-[10px] px-[20px] py-[8px] text-[15px] font-semibold text-white bg-[#6d6d6ed3] rounded cursor-pointer hover:bg-[#6d6d6e66]">
//               <img src={info_icon} alt="" className="w-[25px]" />
//               More Info
//             </button>
//           </div>

//           <TitleCards />
//         </div>
//       </div>

//       <div className="pl-[6%]">
//         <TitleCards title={"Blockbuster Movies"} />
//         <TitleCards title={"Only on Netflix"} />
//         <TitleCards title={"Upcoming"} />
//         <TitleCards title={"Top Picks for You"} />
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;
