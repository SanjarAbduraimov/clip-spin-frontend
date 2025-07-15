import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { AuthLayout } from "@/layout/Auth";

export const ResetEmailSent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <Card className="h-12 w-12 bg-white shadow-lg">
            <img src="/logo.png" alt="logo" />
          </Card>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">Check your email</h1>
            <div className="flex flex-col items-center">
              <p className="text-center text-md text-gray">
                We've sent a password reset link to
              </p>
              <p className="text-center text-md font-semibold">{email}</p>
              <p className="mt-4 text-center text-md text-gray">
                Click the link in the email to reset your password.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail size={32} className="text-primary" />
          </div>
          <p className="text-center text-sm text-gray">
            If you don't see the email, check other places it might be, like
            your junk, spam, social, or other folders.
          </p>
        </div>

        <Button
          variant="link"
          size="link"
          iconLeft={<ArrowLeft size={20} />}
          onClick={() => navigate("/auth/sign-in")}
        >
          Back to login
        </Button>
      </div>
    </AuthLayout>
  );
};
