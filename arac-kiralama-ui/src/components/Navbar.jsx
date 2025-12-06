import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-lg z-50">
      <div className="max-w-[90rem] mx-auto px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://e7.pngegg.com/pngimages/50/859/png-clipart-police-car-motor-vehicle-computer-icons-car.png"
            alt="logo"
            className="w-10 h-10 object-contain drop-shadow-md"
          />
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            <span className="text-blue-400">Filo</span>Rent
          </h1>
        </div>

        {/* Menü */}
        <div className="flex items-center gap-10">
          {[
            ["Ana Sayfa", "/"],
            ["Araçlar", "/araclar"],
            ["Kiralama Noktaları", "/subeler"],
            ["Kampanyalar", "/kampanyalar"],
          ].map(([name, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative text-lg font-medium transition duration-300 ${
                  isActive
                    ? "text-blue-400 after:w-full"
                    : "text-gray-200 hover:text-blue-300"
                } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 after:w-0 hover:after:w-full`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Giriş Butonu */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition duration-300 hover:scale-105">
          Giriş Yap
        </button>
      </div>
    </nav>
  );
}
