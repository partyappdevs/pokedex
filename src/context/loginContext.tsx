import React, { Dispatch, ReactNode, useReducer } from "react";
import { AuthReducer, initialState } from "./loginReducer";
const emptyDispatch = () => null;

const AuthStateContext = React.createContext<AuthState>(initialState);
const AuthDispatchContext =
  React.createContext<Dispatch<ILoginAction>>(emptyDispatch);

export const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
};

export const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (!context) {
    return () => null;
  }

  return context;
};

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  return user ? (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  ) : null;
};
