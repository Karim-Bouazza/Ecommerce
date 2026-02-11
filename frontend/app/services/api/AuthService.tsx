const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class AuthService {
  async Login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  }

  async Register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) {
    const response = await fetch(`${API_BASE_URL}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });
    if (!response.ok) {
      throw Error("Registration failed");
    }

    return await response.json();
  }
}

export const authService = new AuthService();
