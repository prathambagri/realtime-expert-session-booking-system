import { Outlet, Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 px-4 flex h-16 items-center justify-between shadow-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-2xl">🎯</span>
          <span className="text-white text-lg font-bold tracking-tight">
            ExpertBook
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/my-bookings"
            className="text-white text-sm font-medium bg-white/15 px-4 py-2 rounded-lg border border-white/20 no-underline hover:bg-white/25 transition"
          >
            My Bookings
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-indigo-600 bg-white text-sm font-bold px-4 py-2 rounded-lg cursor-pointer border-none hover:bg-gray-100 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Page Content */}
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}
