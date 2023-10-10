const API_USERS = "http://162.19.76.243/api/users";

export async function createUser(newUser) {
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

export async function updateUserProfile(user) {
  const response = await fetch(`${API_USERS}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}
