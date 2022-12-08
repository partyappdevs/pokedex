import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../services/pokemons";

import "./Pokemon.css";

interface Sprites {
  front_default: string | null;
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface Pokemon {
  name: string;
  sprites: Sprites;
}
export default function Pokemon() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [showedImage, setShowedImage] = useState<string>();
  const handlePokemons = async () => {
    const findPokemons = await getPokemonDetail(id || "");
    setPokemon(findPokemons);
  };
  const handleChangeImage = () => {
    if (showedImage === pokemon?.sprites.front_default) {
      setShowedImage(pokemon?.sprites.back_default || "");
    } else {
      setShowedImage(pokemon?.sprites.front_default || "");
    }
  };
  useEffect(() => {
    handlePokemons();
  }, []);

  useEffect(() => {
    if (pokemon) {
      setShowedImage(pokemon.sprites.front_default || "");
    }
  }, [pokemon]);
  console.log("pokemon", pokemon);
  return (
    <div>
      <div>{pokemon?.name}</div>
      <div className="imageContainer">
        <div className="flechita" onClick={handleChangeImage}>
          {"<"}
        </div>
        <img src={showedImage} />
        <div className="flechita" onClick={handleChangeImage}>
          {">"}
        </div>
      </div>
    </div>
  );
}
