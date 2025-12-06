import { useLocation, useNavigate } from "react-router-dom";

export default function AracKart({ arac }) {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const subeId = params.get("subeId");
  const alis   = params.get("alis");
  const donus  = params.get("donus");

  const goDetail = () => {
    navigate(`/arac/${arac.modelId}?subeId=${subeId}&alis=${alis}&donus=${donus}`);
  };

  return (
    <div
      onClick={goDetail}
      className="bg-white rounded-xl shadow hover:shadow-xl transition p-4 cursor-pointer"
    >
      <img
        src={arac.resimUrl || "/car.png"}
        alt={arac.model}
        className="rounded-lg w-full h-48 object-cover pointer-events-none"
      />

      <h2 className="text-xl font-bold mt-4">
        {arac.marka} {arac.model}
      </h2>

      <p className="text-gray-600 mt-2">🚘 Segment: {arac.segment}</p>
      <p className="text-gray-600">⚙️ Vites: {arac.vitesTipi}</p>
      <p className="text-gray-600">⛽ Yakıt: {arac.yakitTipi}</p>

      <p className="text-blue-600 font-bold mt-2">
        Günlük {arac.gunlukFiyat} TL
      </p>
    </div>
  );
}
