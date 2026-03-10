import { Outlet, useNavigate } from "react-router-dom";
import Background from "../../assets/images/netflix-bg.jpg";
import Footer from "../../components/layout/AuthFooter";
import NETFLIX from "../../assets/icons/netflix.svg";

const Auth = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div onClick={() => navigate("/")}>
        <img src={NETFLIX} className="absolute -top-8 left-5 size-40" />
      </div>
      <div className="flex justify-center h-screen items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
