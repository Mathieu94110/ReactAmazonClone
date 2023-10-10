import { ReactNode, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { signin as login, signout as logout } from "@/apis/auth";
import { AuthContext } from "../Context";

function AuthProvider({ children }: { children: ReactNode }) {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);

  async function signin(credentials) {
    const newUser = await login(credentials);
    setUser(newUser);
  }

  async function signout() {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;