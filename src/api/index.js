import { backendUrl } from "constants/index";
import { tokenUtils } from "utils";
export const ApiService = async ({ path, method, data }) => {
  return new Promise(async (resolve, reject) => {
    const authHeader = tokenUtils.getToken()
      ? { Authorization: `Bearer ${tokenUtils.getToken()}` }
      : {};
    const response = await fetch(backendUrl + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      body: data && JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      resolve(result);
    } else {
      const result = await response.json();
      reject({ ...result, status: response.status });
    }
  });
};
