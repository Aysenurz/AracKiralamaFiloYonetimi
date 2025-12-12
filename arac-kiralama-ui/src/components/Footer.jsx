import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-300 py-6 mt-16">
      <div className="max-w-7xl mx-auto text-center space-y-2">
        <p className="text-sm sm:text-base font-medium">
          © 2025 <span className="text-blue-400 font-semibold">FiloRent</span>. Tüm Hakları Saklıdır.
        </p>
        <p className="text-xs sm:text-sm">
          Kayseri, Türkiye | 📞 0 (352) 555 55 55 | ✉️ info@filorent.com
        </p>
      </div>
    </footer>
  );
}
