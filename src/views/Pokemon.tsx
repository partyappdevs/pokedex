import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useCallback, useEffect, useState } from "react";
import useDisclosure from "../hooks/useDisclosure";
import { colours, PokemonTypeName } from "../pokemonContants";
import { getPokemonDetail } from "../services/pokemons";
interface Type {
  name: PokemonTypeName;
  url: string;
}

interface Types {
  slot: number;
  type: Type;
}

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

interface PokemonData {
  name: string;
  sprites: Sprites;
  types: Types[];
}

interface IPokemonProps {
  id: number;
}
export default function Pokemon({ id }: IPokemonProps) {
  const [pokemonData, setPokemon] = useState<PokemonData>();
  const [showedImage, setShowedImage] = useState<string>();
  const { open: loading, handleOpen, handleClose } = useDisclosure();

  const handlePokemons = useCallback(async () => {
    handleOpen();
    const findPokemons = await getPokemonDetail(id);
    setPokemon(findPokemons);
    setTimeout(() => {
      handleClose();
    }, 200);
  }, [handleClose, handleOpen, id]);

  useEffect(() => {
    handlePokemons();
  }, [handlePokemons]);

  useEffect(() => {
    if (pokemonData) {
      setShowedImage(pokemonData.sprites.front_default || "");
    }
  }, [pokemonData]);
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: colours[pokemonData?.types[0]?.type?.name || "normal"],
        maxWidth: "300px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
          height: "200px",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <CardMedia
            component="img"
            height="200"
            width="200"
            image={showedImage}
            sx={{
              objectFit: "contain",
            }}
            alt="pokemonimage"
            onEnded={() => {
              console.log("loaded");
            }}
            loading="eager"
          />
        )}
      </Box>
      <CardContent>
        <Typography variant="h5">{pokemonData?.name}</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              Tipos:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              {pokemonData?.types.reduce((acc, el, index) => {
                if (index === 0) {
                  return el.type.name;
                }
                return `${acc}, ${el.type.name}`;
              }, "")}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
