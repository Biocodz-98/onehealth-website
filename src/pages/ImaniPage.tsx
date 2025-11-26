import { useState } from "react";

export default function ImaniPage() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className="p-8 text-center min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-red-900 mb-2">
            Failed to Load Imani
          </h2>
          <p className="text-red-700 mb-4">
            Please ensure the Imani files are correctly placed.
          </p>
          <p className="text-sm text-gray-600">
            <code className="bg-gray-100 px-2 py-1 rounded">
              /imani-onehealthng/index.html
            </code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full pt-32 md:pt-20"
      style={{ minHeight: "100vh" }}
    >
      {/* Loading Spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#228821] mx-auto mb-4"></div>
            {/* <p className="text-gray-600">Loading Imani...</p> */}
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src="/imani-onehealthng/index.html"
        style={{
          width: "100%",
          minHeight: "calc(100vh - 80px)",
          height: "100%",
          border: "none",
        }}
        title="Imani Application"
        onLoad={handleLoad}
        onError={handleError}
        className={loaded ? "opacity-100" : "opacity-0"}
      />
    </div>
  );
}
