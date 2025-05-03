import { decodeJwt } from "jose";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token || token === "") return false;

  try {
    const { exp } : any = decodeJwt(token);
    return exp * 1000 >= Date.now();
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};

export const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
  
    try {
      const payload = decodeJwt(token);
      return !!payload && !!(payload as any).admin;
    } catch {
      return false;
    }
  };
  
  export const getAuthId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const payload = decodeJwt(token);
      return (payload as any).id ?? null;
    } catch {
      return null;
    }
  };
  