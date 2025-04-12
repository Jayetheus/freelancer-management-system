import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import FreelancerRegistration from "./components/auth/FreelancerRegistration";
import FreelancerLogin from "./components/auth/FreelancerLogin";
import FreelancerProfile from "./components/auth/FreelancerProfile";
import BusinessRegistration from "./components/auth/BusinessRegistration";
import BusinessLogin from "./components/auth/BusinessLogin";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/freelancer/register"
              element={<FreelancerRegistration />}
            />
            <Route path="/freelancer/login" element={<FreelancerLogin />} />
            <Route path="/freelancer/profile" element={<FreelancerProfile />} />
            <Route
              path="/business/register"
              element={<BusinessRegistration />}
            />
            <Route path="/business/login" element={<BusinessLogin />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
