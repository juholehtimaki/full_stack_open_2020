import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = async (username, password) => {
  const response = await axios.post("/api/login", {
    username: username,
    password: password,
  });
  return response.data;
};

export default { getAll, login };
