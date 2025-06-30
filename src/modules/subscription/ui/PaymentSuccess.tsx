import { ArrowRight, CheckCircle, Home, MailIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/Button";

export const PaymentSuccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        {/* Success Icon */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your credits have been added to your account
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            iconRight={<ArrowRight size={18} />}
            asChild
            className="w-full"
          >
            <Link to="/#new-project">Start Creating Videos</Link>
          </Button>

          <Button
            variant="ghost"
            iconLeft={<Home size={18} />}
            asCnew-projecthild
            className="w-full"
          >
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>

        {/* Email Confirmation */}
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
          <div className="flex items-center">
            <MailIcon className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Receipt sent to your email
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Check your inbox for the payment confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
