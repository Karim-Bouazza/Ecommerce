"use client";

import { createContext, useContext, useReducer } from "react";
import { AuthState, AuthAction } from "./auth.types";
import { authReducer, initialState } from "./auth.reducer";

export const AuthContext = createContext<AuthState | null>(null);
export const AuthDispatchContext =
  createContext<React.Dispatch<AuthAction> | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const state = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  if (!state || !dispatch) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return { state, dispatch };
}
