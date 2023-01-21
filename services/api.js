import "isomorphic-fetch";

const apiURL = "http://localhost:8090/api/collections";

class api {
  get(path) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          method: "GET",
        });

        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  remove(path) {
    return new Promise(async (resolve) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          method: "DELETE",
        });
        const res = await response.json();
        resolve(res);
      } catch (e) {
        resolve(null);
      }
    });
  }
}

const API = new api();
export default API;
