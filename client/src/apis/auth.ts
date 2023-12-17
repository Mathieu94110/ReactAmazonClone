import { UserSigninInput, UserType } from "@/types/types";

const API_AUTH = `${process.env.REACT_APP_API_AUTH}`;

export async function signin(
  credentials: UserSigninInput
): Promise<UserType | void> {
  const response = await fetch(API_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Oops une erreur est survenue");
    }
  }
}

export async function getCurrentUser():Promise<UserType> {
  const response = await fetch(`${API_AUTH}/current`);
  return response.json();
}

export async function signout(): Promise<void> {
  await fetch(API_AUTH, {
    method: "DELETE",
  });
}
