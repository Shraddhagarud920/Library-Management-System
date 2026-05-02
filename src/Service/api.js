import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api/book"
});

// Add a request interceptor to attach the JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Define your service methods
export const BookService = {
  getAllBooks: () => api.get('/getAll'),
  addBook: (bookData) => api.post('/add', bookData),
  deleteBook: (id) => api.delete(`/delete/${id}`),
  updateBook: (bookData) => api.put('/update', bookData)
};
