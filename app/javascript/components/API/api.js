export const oneUser = id => {
  return fetch(`/user/${id}.json`).then(resp => {
    return resp.json();
  });
};

export const myRatings = id => {
  return fetch(`/myratings/${id}.json`).then(resp => {
    return resp.json();
  });
};

export const oneStaticUser = unique_url => {
  return fetch(`/staticuser/${unique_url}.json`).then(resp => {
    return resp.json();
  });
};

export const myStaticRatings = unique_url => {
  return fetch(`/mystaticratings/${unique_url}.json`).then(resp => {
    return resp.json();
  });
};

export const myLastRating = id => {
  return fetch(`/mycurrentratings/${id}.json`).then(resp => {
    return resp.json();
  });
};

export const createRating = (rating, token) => {
  return fetch(`/ratings`, {
    body: JSON.stringify(rating),
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": token
    },
    method: "POST"
  }).then(resp => {
    return resp.json();
  });
};

export const allCategories = () => {
  return fetch(`/categories`).then(resp => {
    return resp.json();
  });
};
