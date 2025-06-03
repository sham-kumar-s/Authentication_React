import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />

          <Route path="/auth" element={<AuthForm />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};
export default App;
