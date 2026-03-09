import ReasonCard from "./ReasonCard";
import { Tv, Download, Smartphone, Smile } from "lucide-react";

const ReasonCardSet = () => {
  return (
    <section className="px-6 py-10">
      {/* Title */}
      <h2 className="mb-6 text-2xl font-semibold text-white">
        More reasons to join
      </h2>

      {/* Cards Grid */}
      <div className="grid gap-6 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
        <ReasonCard
          title="Enjoy on your TV"
          description="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more."
          Icon={Tv}
        />

        <ReasonCard
          title="Download your shows to watch offline"
          description="Save your favourites easily and always have something to watch."
          Icon={Download}
        />

        <ReasonCard
          title="Watch everywhere"
          description="Stream unlimited movies and TV shows on your phone, tablet, laptop and TV."
          Icon={Smartphone}
        />

        <ReasonCard
          title="Create profiles for kids"
          description="Send kids on adventures with their favourite characters in a space made just for them."
          Icon={Smile}
        />
      </div>
    </section>
  );
};

export default ReasonCardSet;
