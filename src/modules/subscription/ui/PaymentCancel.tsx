import { XCircle, Home, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/Button";

export const PaymentCancel = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        {/* Cancel Icon */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your payment was not processed
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            iconRight={<RefreshCw size={18} />}
            asChild
            className="w-full"
          >
            <Link to="/pricing">Try Again</Link>
          </Button>

          <Button
            variant="ghost"
            iconLeft={<Home size={18} />}
            asChild
            className="w-full"
          >
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>

        {/* Note */}
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/20">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
                Need help with your purchase?
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Contact our support team for assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
