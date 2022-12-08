import api from "./api";

export const getPokemons = async () => {
  return api.get("pokemon").then((res) => {
    return res.data;
  });
};

export const getPokemonDetail = (id: string) => {
  return api.get(`pokemon/${id}`).then((res) => {
    return res.data;
  });
};
