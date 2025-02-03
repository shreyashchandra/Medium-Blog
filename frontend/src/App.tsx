import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signup, Signin, Blog, Dashboard, UserUpdate } from "./pages";
import { useAuth } from "./hooks/useAuth";
import AddBlog from "./pages/AddBlog";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Signin />}
        />
        <Route
          path="/blog/:id"
          element={
            isAuthenticated ? <Blog /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/user/update"
          element={
            isAuthenticated ? <UserUpdate /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/add/blog"
          element={
            isAuthenticated ? <AddBlog /> : <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
