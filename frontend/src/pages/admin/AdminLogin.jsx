import { SignIn } from "@clerk/clerk-react";

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <span className="text-4xl">🎯</span>
          <h1 className="text-2xl font-bold text-indigo-600 mt-2">
            ExpertBook Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to access the admin panel
          </p>
        </div>
        <SignIn
          routing="hash"
          afterSignInUrl="/admin"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl rounded-2xl",
            },
          }}
        />
      </div>
    </div>
  );
}
