import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemons } from "../services/pokemons";
interface Pokemon {
  name: string;
  url: string;
}
interface PokemonList {
  count: number;
  next: string;
  previus: string | null;
  results: Pokemon[];
}
export default function Pokedex() {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<PokemonList>();
  const handleGoToPokemon = (url: string) => {
    const path = url.substring(url.indexOf("pokemon"), url.length - 1);
    navigate(path);
  };
  const handlePokemons = async () => {
    const findPokemons = await getPokemons();
    setPokemons(findPokemons);
  };

 

  useEffect(() => {
    handlePokemons();
  }, []);
  console.log(pokemons);
  return (
    <div>
      {pokemons && (
        <ul>
          {pokemons?.results.map((element) => (
            <li onClick={() => handleGoToPokemon(element.url)}>
              {element.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
