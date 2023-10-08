import { createContext } from "react";
import { UserContextType } from "@/types/types";

export const AuthContext = createContext<UserContextType | null>(null);
