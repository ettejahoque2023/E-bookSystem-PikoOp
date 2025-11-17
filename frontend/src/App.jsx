import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UploadBook from "./pages/UploadBook";
import BookDetails from "./pages/BookDetails";


import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import './App.css'

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadBook />} />
            <Route path="/books/:id" element={<BookDetails />} />


          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
