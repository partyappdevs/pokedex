import { colors, Grid, Paper } from "@mui/material";
import React, {
  createRef,
  RefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { useEffect } from "react";
import { getPokemons } from "../services/pokemons";
import Pokemon from "./Pokemon";
import "./Pokemon.css";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonList>();
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);
  const [fetch, setFetch] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>();
  const lastItemRef = useRef<HTMLDivElement | null>();
  const handleGoToPokemon = (url: string) => {
    const path = url.substring(url.lastIndexOf("pokemon/"), url.length - 1);

    const number = path.substring(path.indexOf("/") + 1, path.length);
    setPokemonId(+number);
  };

  const handlePokemons = useCallback(async () => {
    const findPokemons: PokemonList = await getPokemons(0).then((res) => {
      setFetch(false);

      return res;
    });
    setPokemons(findPokemons);
  }, []);

  const reFetch = useCallback(async (num: number) => {
    const findPokemons: PokemonList = await getPokemons(num).then((res) => {
      setFetch(false);

      return res;
    });
    if (findPokemons.next === null) {
      setNoData(true);
    }
    setPokemons((prevState) => {
      if (prevState && findPokemons.next !== prevState.next) {
        return {
          ...prevState,
          results: [...prevState.results, ...findPokemons.results],
        };
      }
    });
    setPage((prevState) => prevState + 1);
  }, []);

  useEffect(() => {
    handlePokemons();
  }, [handlePokemons]);

  return (
    <Grid
      container
      direction="row"
      width="100vw"
      wrap="nowrap"
      spacing={3}
      overflow="hidden"
      height="102.7vh"
      justifyContent="center"
    >
      {pokemons ? (
        <Grid
          ref={(ref) => {
            listRef.current = ref;
          }}
          component="div"
          paddingTop="40px"
          container
          paddingLeft={0}
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          spacing={4}
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
          width={{ xs: "50%", sm: "40%", md: "40", lg: "25%" }}
          minWidth={"150px"}
          overflow="auto"
          wrap="nowrap"
          onScroll={(event) => {
            const last = document
              .getElementById("lastPokemon")
              ?.getBoundingClientRect();
            if (last && last?.top < 1300 && !fetch && !noData) {
              event.preventDefault();
              event.stopPropagation();
              setFetch(true);
              reFetch(page + 1);
            }
          }}
          boxShadow="2px 5px 20px 6px rgba(130,130,130,1)"
        >
          {pokemons?.results.map((element, index) => (
            <Grid
              item
              width={{ xs: "95%", sm: "80%", md: "80", lg: "80%" }}
              minWidth="120px"
              alignItems="center"
              paddingLeft="0px"
              justifyContent="center"
              key={element.name}
              height="60px"
              component="div"
              ref={(ref) => {
                if (index === pokemons.results.length - 1) {
                  lastItemRef.current = ref;
                }
              }}
              id={
                index === pokemons.results.length - 1
                  ? "lastPokemon"
                  : `pokemon-${element.name}`
              }
            >
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  paddingTop: "8px",
                  cursor: "pointer",
                }}
                onClick={() => handleGoToPokemon(element.url)}
                elevation={2}
              >
                {element.name}
              </Paper>
            </Grid>
          ))}
          {noData && (
            <Paper
              sx={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                paddingTop: "8px",
                cursor: "pointer",
                backgroundColor: colors.red[500],
              }}
              elevation={2}
            >
              UPS! LLegaste al final de la pokedex
            </Paper>
          )}
        </Grid>
      ) : null}
      <Grid
        container
        item
        height="auto"
        width={{ xs: "50%", sm: "60%", md: "60%", lg: "75%", xl: "80%" }}
        alignItems="center"
        justifyContent="center"
      >
        {/* <Container> */}
        {pokemonId && <Pokemon id={pokemonId} />}
        {/* </Container> */}
      </Grid>
    </Grid>
  );
}
