import { SignIn } from "@clerk/clerk-react";

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-lg lg:grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden flex-col justify-center bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-12 text-white lg:flex">
          <div className="mb-8 text-6xl">🎯</div>

          <h1 className="text-3xl font-extrabold leading-tight">
            ExpertBook
            <br />
            Admin Panel
          </h1>

          <p className="mt-6 text-lg text-indigo-100 leading-8">
            Securely manage experts, bookings, users and platform analytics from
            one powerful dashboard.
          </p>

          <div className="mt-12 space-y-4 text-indigo-100">
            <div className="flex items-center gap-3">
              <span>✔</span>
              <span>Manage Experts</span>
            </div>

            <div className="flex items-center gap-3">
              <span>✔</span>
              <span>Track Bookings</span>
            </div>

            <div className="flex items-center gap-3">
              <span>✔</span>
              <span>Manage Users & Admins</span>
            </div>

            <div className="flex items-center gap-3">
              <span>✔</span>
              <span>View Dashboard Analytics</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mb-4 text-5xl">🔐</div>

              <h2 className="text-3xl font-bold text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to continue to the admin dashboard.
              </p>
            </div>

            <SignIn
              routing="hash"
              afterSignInUrl="/admin"
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "shadow-none border-0 rounded-lg bg-transparent",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
