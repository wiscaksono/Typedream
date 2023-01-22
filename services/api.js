import "isomorphic-fetch";
import PocketBase from "pocketbase";

const apiURL = "http://localhost:8090/api/collections";
const pb = new PocketBase("http://127.0.0.1:8090");

class api {
  update(path, id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await pb.collection(path).update(id, data);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  delete(path, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await pb.collection(path).delete(id);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

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
}

const API = new api();
export default API;
