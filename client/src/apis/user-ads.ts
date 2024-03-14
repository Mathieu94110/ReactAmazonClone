import { UpdateUserAdType, UserAdType } from "@/types/types";

const API_USER_ADS = `${process.env.REACT_APP_API_USER_ADS}`;

export async function getUserAds(userId: string): Promise<UserAdType[]> {
  const response = await fetch(`${API_USER_ADS}/${userId}`);
  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Error fetch user ads");
  }
}

export async function getAd(_id: string): Promise<Response> {
  const response = await fetch(`${API_USER_ADS}/${_id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error fetch user ad");
  }
}

export async function deleteAd(_id: string): Promise<Response> {
  try {
    const response = await fetch(`${API_USER_ADS}/${_id}`, {
      method: "DELETE",
    });
    return response;
  } catch {
    throw new Error("Error delete user ad");
  }
}

export async function updateAd(updatedAd: UpdateUserAdType) {
  const { adId, ...restAd } = updatedAd;
  const response = await fetch(`${API_USER_ADS}/update/${adId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restAd),
  });
  if (response.ok) {
    return response;
  } else {
    throw new Error("Error update user ad");
  }
}

export async function createAd(data: UserAdType): Promise<Response> {
  const response = await fetch(API_USER_ADS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  if (response.ok) {
    return response;
  } else {
    throw new Error("Error create user ad");
  }
}
