import { UserType } from "@/types/types";
import { getCurrentUser } from "../apis/auth";

export async function rootLoader(): Promise<UserType> {
  return getCurrentUser();
}
