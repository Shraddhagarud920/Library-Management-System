import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import BookList from "./Pages/BookList";
import AddBook from "./Pages/AddBook";
import MyNavbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/books" element={
          <ProtectedRoute>
            <BookList />
          </ProtectedRoute>
        } />

        <Route path="/add" element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;