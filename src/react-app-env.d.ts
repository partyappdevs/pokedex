/// <reference types="react-scripts" />

interface User {
  name: string;
  lastname: string;
  fullname: string;
  username: string;
  token: string;
}
interface AuthState {
  user: User | null;
  token: string;
  loading: boolean;
  errorMessage: string | null;
}
interface ILoginAction {
  type: LoginActionType;
  payload: ILoginPayload;
  error: string;
}

interface PokemonData {
  name: string;
  url: string;
}

interface PokemonList {
  count: number;
  next: string;
  previus: string | null;
  results: PokemonData[];
}
