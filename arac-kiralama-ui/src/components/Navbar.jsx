export default function Navbar() {
  return (
    <nav className="w-full bg-gece text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold tracking-wide">
          FiloRent
        </h1>

        <div className="hidden md:flex space-x-8 text-lg">
          <a href="/" className="hover:text-acikmavi transition">Araçlar</a>
          <a href="/" className="hover:text-acikmavi transition">Kiralama Noktaları</a>
          <a href="/" className="hover:text-acikmavi transition">Kampanyalar</a>
        </div>

        <button className="md:hidden text-3xl">☰</button>
      </div>
    </nav>
  );
}
