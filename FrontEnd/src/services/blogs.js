import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLike = async (likedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `/api/blogs/${likedBlog.id}`,
    likedBlog,
    config,
  );
  return response.data;
};

const deleteBlog = async (BlogToDelete) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`/api/blogs/${BlogToDelete.id}`, config);
  return response.data;
};

export default { setToken, getAll, postBlog, addLike, deleteBlog };
