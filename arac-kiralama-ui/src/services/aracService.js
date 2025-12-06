import api from "./api";

export const getAllAraclar = () => {
  return api.get("/Araclar");
};

export const getAracById = (id) => {
  return api.get(`/Araclar/${id}`);
};
