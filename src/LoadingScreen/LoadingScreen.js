import React from "react";

const LoadingScreen = ({ size }) => {
  console.log(size);
  return (
    <>
      <div class="border border-purple-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div
            style={{ width: `${size}px`, height: `${size}px` }}
            className="animate-spin"
          >
            <div
              className="h-full w-full border-2 border-t-purple-500
           border-b-purple-700 rounded-[50%]"
            ></div>
          </div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-purple-700 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-purple-700 rounded col-span-1"></div>
                <div class="h-2 bg-purple-700 rounded col-span-2"></div>
              </div>
              <div class="h-2 bg-purple-700 rounded"></div>
              <div class="h-2 bg-purple-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
