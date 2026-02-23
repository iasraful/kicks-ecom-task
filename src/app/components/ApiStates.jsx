import React from 'react';

export const LoadingState = ({ message = "Loading...", className = "" }) => (
    <div className={`text-center py-12 text-lg font-semibold text-gray-500 ${className}`}>
        {message}
    </div>
);

export const ErrorState = ({ message, onRetry, className = "" }) => (
    <div className={`text-center py-12 text-lg font-semibold text-red-500 ${className}`}>
        <p className="mb-4">{message}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
                Retry
            </button>
        )}
    </div>
);

export const EmptyState = ({ message = "No products found.", onReset, className = "" }) => (
    <div className={`text-center py-12 text-lg font-semibold text-gray-500 ${className}`}>
        <p className="mb-4">{message}</p>
        {onReset && (
            <button
                onClick={onReset}
                className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
                Reset Filters
            </button>
        )}
    </div>
);
