import { authService } from "@/app/services/api/AuthService";
import { useAuth } from "@/app/store/auth/auth.context";

export default function useAuthActions() {
  const { dispatch } = useAuth();

  const login = async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await authService.Login(email, password);
      dispatch({ type: "AUTH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE" });
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await authService.Register(
        name,
        email,
        password,
        password_confirmation,
      );
      dispatch({ type: "AUTH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE" });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return { login, register, logout };
}
