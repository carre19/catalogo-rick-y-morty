import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export async function getItems({ name = "", page = 1 } = {}) {
  const params = { page };
  if (name) params.name = name;

  const { data } = await api.get("/character", { params });
  return data;
}

export async function getItemById(id) {
  const { data } = await api.get(`/character/${id}`);
  return data;
}
