import { Suspense, lazy } from "react";

const MethodApp = lazy(() => import("../../src/method-app/src/App"));

export default function MethodPage() {
  return (
    <div className="method-page-container ">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#228821] mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading Method...</p>
            </div>
          </div>
        }
      >
        <div className="w-full min-h-screen">
          <MethodApp />
        </div>
      </Suspense>
    </div>
  );
}
