"use client";
import React from 'react';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            title: "Good Quality",
            description: "I highly recommend shopping from kicks",
            rating: 5.0,
            userImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
            reviewImg: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
        },
        {
            id: 2,
            title: "Good Quality",
            description: "I highly recommend shopping from kicks",
            rating: 5.0,
            userImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            reviewImg: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
        },
        {
            id: 3,
            title: "Good Quality",
            description: "I highly recommend shopping from kicks",
            rating: 5.0,
            userImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
            reviewImg: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop"
        }
    ];

    return (
        <section className="py-12 sm:py-20 px-4 md:px-8">
            <div className="mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#232321] uppercase tracking-tight">REVIEWS</h2>
                    <button className="bg-[#4a69e2] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg transition">
                        SEE ALL
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-[32px] overflow-hidden flex flex-col">
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#232321]">{review.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{review.description}</p>
                                        <div className="flex items-center gap-1 mt-3">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(review.rating) ? "#ffa52f" : "none"} stroke="#ffa52f" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                            ))}
                                            <span className="text-xs font-bold text-[#232321] ml-1">{review.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <img src={review.userImg} alt="User" className="w-12 h-12 rounded-full border-2 border-[#4a69e2]" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <img src={review.reviewImg} alt="Review Product" className="w-full h-64 sm:h-80 object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
