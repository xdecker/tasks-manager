import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-lg border p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-200 rounded w-2/3" />
      <div className="h-3 bg-gray-200 rounded w-full" />
    </div>
  );
};
