import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/campaigns/logo.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const kullanici = JSON.parse(localStorage.getItem("kullanici"));

  const handleLogout = () => {
    localStorage.removeItem("kullanici");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-lg z-50">
      <div className="max-w-[90rem] mx-auto px-10 py-5 flex items-center justify-between">
        
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="ASE Filo"
            className="h-12 w-auto object-contain drop-shadow-md bg-white rounded-lg p-1"
          />
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            <span className="text-blue-400">ASE</span> Rent a Car
          </h1>
        </div>

        {/* MENÜ */}
        <div className="flex items-center gap-10">
          {[
            ["Ana Sayfa", "/"],
            ["Araç Filosu", "/araclar"],
            ["Kiralama Noktaları", "/subeler"],
            ["Kampanyalar", "/kampanyalar"],
            ["Yardım", "/yardim"],
          ].map(([name, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative text-lg font-medium transition duration-300 ${
                  isActive
                    ? "text-blue-400"
                    : "text-white hover:text-blue-400"
                }`
              }
            >
              {name}
            </NavLink>
          ))}

          {/* SAĞ TARAF */}
          <div className="flex items-center gap-3 ml-6">
            {!kullanici ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white rounded-lg shadow transition"
                >
                  Üye Ol
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/profil"
                  className="px-4 py-2 text-white hover:text-blue-400 font-semibold"
                >
                  Profilim
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
                >
                  Çıkış Yap
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}