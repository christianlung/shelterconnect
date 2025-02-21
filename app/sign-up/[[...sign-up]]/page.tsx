import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Join ShelterConnect to help or find help
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border border-gray-200",
              formFieldInput: "rounded-lg border-gray-300",
              formButtonPrimary: "bg-primary-500 hover:bg-primary-600",
            },
          }}
          path="/sign-up"
          unsafeMetadata={{
            role: undefined
          }}
        />
      </div>
    </div>
  );
} 