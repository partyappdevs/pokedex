import api from "./api";
const LIMIT = 60;
export const getPokemons = (page: number): Promise<PokemonList> => {
  return api
    .get("pokemon", {
      params: {
        limit: LIMIT,
        offset: LIMIT * page,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getPokemonDetail = (id: number) => {
  return api.get(`pokemon/${id}`).then((res) => {
    return res.data;
  });
};
