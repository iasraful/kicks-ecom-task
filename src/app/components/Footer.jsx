
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="bg-transparent py-6 flex flex-col items-center justify-center w-full px-4 md:px-8">
			<div className="w-full rounded-t-3xl rounded-b-2xl overflow-hidden" style={{ background: 'none' }}>
				{/* Newsletter + Logo */}
				<div className="bg-[#4a69e2] px-6 sm:px-10 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 rounded-t-3xl">
					<div className="flex-1">
						<h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-2">JOIN OUR KICKSPLUS<br />CLUB &amp; GET 15% OFF</h2>
						<p className="text-white/90 mb-4">Sign up for free! Join the community.</p>
						<form className="flex flex-col sm:flex-row gap-2 max-w-md">
							<input type="email" placeholder="Email address" className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm" />
							<button type="submit" className="bg-black hover:bg-[#111] text-white px-8 py-3 rounded-lg font-bold text-sm transition">SUBMIT</button>
						</form>
					</div>
					<div className="flex-1 flex justify-center items-center">
						<span className="text-white text-7xl sm:text-9xl font-extrabold tracking-tight relative select-none">
							KICKS<span className="text-yellow-400 text-3xl sm:text-4xl align-super ml-1">+</span>
						</span>
					</div>
				</div>
				{/* Info Section */}
				<div className="bg-[#232321] text-white px-6 sm:px-10 py-16 flex flex-col md:flex-row md:justify-between gap-8 rounded-b-2xl relative overflow-hidden">
					<div className="flex-1 min-w-[160px] mb-6 md:mb-0 z-10">
						<h3 className="text-base font-extrabold text-yellow-400 mb-3">About us</h3>
						<p className="text-sm text-white/70 leading-relaxed">We are the biggest hyperstore in the universe.<br />We got you all cover with our exclusive collections and latest drops.</p>
					</div>
					<div className="flex-1 min-w-[120px] mb-6 md:mb-0 z-10">
						<h3 className="text-base font-extrabold text-yellow-400 mb-3">Categories</h3>
						<ul className="text-sm space-y-2 text-white/70">
							<li>Runners</li>
							<li>Sneakers</li>
							<li>Basketball</li>
							<li>Outdoor</li>
							<li>Golf</li>
							<li>Hiking</li>
						</ul>
					</div>
					<div className="flex-1 min-w-[100px] mb-6 md:mb-0 z-10">
						<h3 className="text-base font-extrabold text-yellow-400 mb-3">Company</h3>
						<ul className="text-sm space-y-2 text-white/70">
							<li>About</li>
							<li>Contact</li>
							<li>Blogs</li>
						</ul>
					</div>
					<div className="flex-1 min-w-[100px] z-10">
						<h3 className="text-base font-extrabold text-yellow-400 mb-3">Follow us</h3>
						<div className="flex gap-4 mt-2">
							<a href="#" aria-label="Facebook" className="text-white/70 hover:text-yellow-400 transition"><FaFacebookF size={20} /></a>
							<a href="#" aria-label="Instagram" className="text-white/70 hover:text-yellow-400 transition"><FaInstagram size={20} /></a>
							<a href="#" aria-label="Twitter" className="text-white/70 hover:text-yellow-400 transition"><FaTwitter size={20} /></a>
							<a href="#" aria-label="TikTok" className="text-white/70 hover:text-yellow-400 transition"><FaTiktok size={20} /></a>
						</div>
					</div>
					{/* Large KICKS background watermark */}
					<span
						className="absolute bottom-0 left-0 right-0 font-extrabold text-white/5 select-none pointer-events-none text-center"
						style={{ fontSize: '22vw', lineHeight: '0.85', zIndex: 0 }}
					>
						KICKS
					</span>
				</div>
			</div>
			<div className="text-center text-xs text-gray-500 mt-4">© All rights reserved</div>
		</footer>
	);
};

export default Footer;
