import Profile from "../Profile/Profile";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo, showItems, searchItem }) => {
  let navigate = useNavigate();
  const LogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="h-[10vh] w-full items-center justify-between bg-blue-300 text-blue-950 px-2 font-bold flex">
      <h2 className="flex px-2 text-lg">Notes</h2>
      {showItems && <Search searchItem={searchItem} />}
      {showItems && <Profile LogOut={LogOut} userInfo={userInfo} />}
    </nav>
  );
};

export default Navbar;
