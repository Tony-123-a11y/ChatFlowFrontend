import { Home, User, Users, Bookmark } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export function BottomNav() {
  const { chatting, user } = useSelector((state) => state.user);

  const navItems = [
    { icon: <Home size={22} />, path: "/" },
    { icon: <User size={22} />, path: "/profile" },
    { icon: <Users size={22} />, path: "/chats" },
    { icon: <Bookmark size={22} />, path: "/saved" },
  ];

  const navLinkClasses = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 text-xs ${
      isActive ? "text-purple-600" : "text-gray-500"
    }`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-100 py-2 bg-white border-t border-gray-200 shadow-md md:hidden">
      <div className="grid grid-cols-4">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            state={user?._id}
            className={navLinkClasses}
          >
            {item.icon}
            {!chatting && <span>{item.path === "/" ? "Home" : item.path.slice(1)}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
