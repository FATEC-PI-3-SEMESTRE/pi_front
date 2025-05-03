import { useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import { useState } from "react";
import { isAdmin, isAuthenticated } from "../services/auth";
import { api } from "../services/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api
      .post("/auth/login", { email: email, password: password })
      .then((response) => {
        if (response.data == "Dados inválidos!") {
          return;
        }
        localStorage.setItem("token", response.data.token);
        console.log("authenticated");
        isAuthenticated()
          ? isAdmin()
            ? Navigate("/admin")
            : Navigate("/")
          : console.error("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-green-400 p-4">
      <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-white bg-opacity-50 rounded-2xl z-0 flex items-center justify-center m-6">
      <div className="relative flex w-3/4 h-3/4 bg-white rounded-2xl overflow-hidden shadow-xl">
        
        {/* Lado esquerdo */}
        <div className="w-1/2 flexflex-col justify-center items-start p-36 bg-gradient-to-r from-blue-300 to-green-400 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to website</h1>
          <p className="text-lg max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Lado direito */}
        <div className="w-1/2 flex justify-center items-center p-12 bg-white">
          <form onSubmit={login} className="w-full max-w-sm space-y-6">
            <h2 className="text-3xl font-semibold text-center text-blue-400">LOGIN</h2>
            <br/>
            <Input
              value={email}
              placeholder={"Email"}
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              autoComplete="email"
              className="mb-4"
            />

            <br/>

            <Input
              value={password}
              placeholder={"Senha"}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              autoComplete="current-password"
              className="mb-4"
            />
            <br/>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-300 to-green-400 text-white font-semibold hover:opacity-90"
            >
              LOGIN
            </button>
          </form>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};
