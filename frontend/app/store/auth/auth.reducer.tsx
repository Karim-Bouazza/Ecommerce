import { AuthAction, AuthState } from "./auth.types";

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true };
    case "AUTH_SUCCESS":
      return { user: action.payload, isAuthenticated: true, loading: false };
    case "AUTH_FAILURE":
      return { ...state, loading: false };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}
