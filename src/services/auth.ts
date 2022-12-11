import loginApi from "./loginApi";

const login = (username: string, password: string) => {
  return loginApi.post("auth/login", { username, password });
};

const profile = (token: string) => {
  return loginApi.get("profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const register = (
  name: string,
  lastname: string,
  username: string,
  password: string
) => {
  return loginApi.post("users", { name, lastname, username, password });
};

const auth = { login, profile, register };

export default auth;
