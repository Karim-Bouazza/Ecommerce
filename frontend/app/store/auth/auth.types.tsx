export type AuthState = {
  user: null | { id: number; name: string; email: string };
  isAuthenticated: boolean;
  loading: boolean;
};

export type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: AuthState["user"] }
  | { type: "AUTH_FAILURE" }
  | { type: "LOGOUT" };
