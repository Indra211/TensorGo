const baseUrl = "http://127.0.0.1:5000/api/v1";

export const urls = {
  googleAuth: `${baseUrl}/user/google/auth`,
  getUser: `${baseUrl}/user/get`,
  updateUser: `${baseUrl}/user/update`,
  getRequests: `${baseUrl}/requests/all`,
  submitRequest: `${baseUrl}/requests/create`,
};
