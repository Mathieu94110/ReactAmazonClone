const API_USER_ADS = `${process.env.REACT_APP_API_USER_ADS}`;

export async function getUserAds(userId) {
  const response = await fetch(`${API_USER_ADS}/ads/${userId}`);
  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Error fetch user ads");
  }
}

export async function getAd(_id) {
  const response = await fetch(`${API_USER_ADS}/${_id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error fetch user ad");
  }
}

export async function deleteAd(_id) {
  const response = await fetch(`${API_USER_ADS}/${_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return _id;
  } else {
    throw new Error("Error delete user ad");
  }
}

export async function updateAd(updatedAd) {
  const { _id, ...restAd } = updatedAd;
  const response = await fetch(`${API_USER_ADS}/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restAd),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error update user ad");
  }
}

export async function createAd(data) {
  const { userId, ...rest } = data;
  const response = await fetch(API_USER_ADS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...rest, userId: userId }),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error create user ad");
  }
}
