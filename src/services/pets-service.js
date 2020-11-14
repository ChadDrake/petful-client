import config from "../config";

const petsService = {
  getPets() {
    return fetch(`${config.API_ENDPOINT}/pets`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  adopt(type) {
    return fetch(`${config.API_ENDPOINT}/pets`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ type }),
    }).then((res) => (!res.ok ? (e) => Promise.reject(e) : null));
  },
};

export default petsService;
