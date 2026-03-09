import PublicHeader from "./PublicHeader";
import ProtectedHeader from "./ProtectedHeader";
// import { useAuth } from "../../context/AuthContext";

const Header = () => {
//   const { user } = useAuth();
const user = false;

  if (user) {
    return <ProtectedHeader />;
  } else {
    return <PublicHeader />;
  }
};

export default Header;
