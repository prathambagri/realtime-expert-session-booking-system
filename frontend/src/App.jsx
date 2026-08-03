import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
  SignInButton,
} from "@clerk/clerk-react";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import ExpertList from "./pages/ExpertList";
import ExpertDetail from "./pages/ExpertDetail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/admin/Dashboard";
import Experts from "./pages/admin/Experts";
import Bookings from "./pages/admin/Bookings";
import Users from "./pages/admin/Users";
import AdminLogin from "./pages/admin/AdminLogin";
import SyncUser from "./components/SyncUser";
import AdminManagement from "./pages/admin/AdminManagement";

const AdminRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) return null;

  const isAdmin = user.publicMetadata?.role === "admin";
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-500 mb-6">
            You don't have admin permissions.
          </p>
          <a
            href="/"
            style={{
              padding: "10px 24px",
              background: "#16A34A",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <SyncUser />

      <Routes>
        {/* Public Website */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ExpertList />} />
          <Route path="/experts/:id" element={<ExpertDetail />} />
          <Route
            path="/booking/:id"
            element={
              <>
                <SignedIn>
                  <Booking />
                </SignedIn>
                <SignedOut>
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Sign In Required
                    </h2>
                    <p className="text-gray-500 mb-6">
                      You need to sign in to book a session with an expert.
                    </p>
                    <SignInButton mode="modal">
                      <button
                        style={{
                          padding: "12px 28px",
                          background: "#16A34A",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10px",
                          fontWeight: "600",
                          fontSize: "15px",
                          cursor: "pointer",
                          boxShadow: "0 4px 16px rgba(22,163,74,0.3)",
                        }}
                      >
                        Sign In to Continue
                      </button>
                    </SignInButton>
                  </div>
                </SignedOut>
              </>
            }
          />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>

        {/* Admin Panel - Protected */}
        <Route
          path="/admin"
          element={
            <>
              <SignedIn>
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              </SignedIn>
              <SignedOut>
                <AdminLogin />
              </SignedOut>
            </>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="experts" element={<Experts />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<Users />} />
          <Route path="admins" element={<AdminManagement />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
