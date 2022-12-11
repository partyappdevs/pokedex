const currentUser = localStorage.getItem("currentUser");
const user: User = currentUser && JSON.parse(currentUser);
const token = localStorage.getItem("token");

export const initialState: AuthState = {
  user: user || null,
  token: token || "",
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (
  state: AuthState,
  action: ILoginAction
): AuthState => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
      };
    }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };

    default:
      return { ...state };
  }
};
