import { UserSignupInput, UserUpdate } from "@/types/types";

const API_USERS = `${process.env.REACT_APP_API_USERS}`;

export async function createUser(
  newUser: UserSignupInput
): Promise<Exclude<UserSignupInput, "generic"> | void> {
  const response = await fetch(API_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error api createUser");
    }
  }
}

export async function updateUserProfile(user: UserUpdate): Promise<Response> {
  const response = await fetch(`${API_USERS}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}

export async function forgotPassword(email: string): Promise<Response> {
  const response = await fetch(`${API_USERS}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ email }),
  });
  const body = await response.json();
  if (response.ok) {
    return response;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error api createUser");
    }
  }
}
