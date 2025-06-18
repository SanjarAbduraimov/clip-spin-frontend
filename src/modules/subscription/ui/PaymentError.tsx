import { Home, MailIcon, XCircle } from "lucide-react";

import { Button } from "@/components/Button";

export const PaymentError = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-rose-50 p-4 dark:from-gray-900 dark:to-gray-800">
    <div className="w-full max-w-md">
      {/* Error Icon */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Payment Failed
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          We couldn&apos;t process your payment
        </p>
      </div>

      {/* Common Solutions */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Common Solutions
        </h3>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400" />
            Check that your card details are correct
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400" />
            Ensure you have sufficient funds
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400" />
            Try a different payment method
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400" />
            Contact your bank if the issue persists
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full" iconLeft={<Home />} variant="ghost">
          Back to Dashboard
        </Button>
      </div>

      {/* Support Contact */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-600 dark:bg-gray-800">
        <p className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <span>Need help?</span>
          <Button
            iconLeft={<MailIcon size={18} />}
            variant="link"
            size="link"
            className="ml-2"
          >
            Contact Support
          </Button>
        </p>
      </div>
    </div>
  </div>
);
