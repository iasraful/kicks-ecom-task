
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="bg-transparent py-10 flex flex-col items-center justify-center w-full">
			<div className="w-full rounded-t-3xl rounded-b-2xl overflow-hidden border-2 border-purple-200" style={{background: 'none'}}>
				{/* Newsletter + Logo */}
				<div className="bg-[#4a69e2] px-8 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 rounded-t-3xl">
					<div className="flex-1">
						<h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-2">JOIN OUR KICKSPLUS<br />CLUB & GET 15% OFF</h2>
						<p className="text-white/90 mb-4">Sign up for free! Join the community.</p>
						<form className="flex flex-col sm:flex-row gap-2 max-w-md">
							<input type="email" placeholder="Email address" className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
							<button type="submit" className="bg-black text-white px-6 py-2 rounded-md font-bold">SUBMIT</button>
						</form>
					</div>
					<div className="flex-1 flex justify-center items-center">
						<span className="text-white text-6xl sm:text-7xl font-extrabold tracking-tight relative">
							KICKS<span className="text-yellow-400 text-2xl align-super ml-1">+</span>
						</span>
					</div>
				</div>
				{/* Info Section */}
				<div className="bg-[#232321] text-white px-8 py-16 flex flex-col md:flex-row md:justify-between gap-8 rounded-b-2xl relative">
					<div className="flex-1 min-w-50 mb-6 md:mb-0">
						<h3 className="text-lg font-extrabold text-yellow-400 mb-2">About us</h3>
						<p className="text-sm text-white/90">We are the biggest hyperstore in the universe.<br />We got you all cover with our exclusive collections and latest drops.</p>
					</div>
					<div className="flex-1 min-w-37.5 mb-6 md:mb-0">
						<h3 className="text-lg font-extrabold text-yellow-400 mb-2">Categories</h3>
						<ul className="text-sm space-y-1">
							<li>Runners</li>
							<li>Sneakers</li>
							<li>Basketball</li>
							<li>Outdoor</li>
							<li>Golf</li>
							<li>Hiking</li>
						</ul>
					</div>
					<div className="flex-1 min-w-30 mb-6 md:mb-0">
						<h3 className="text-lg font-extrabold text-yellow-400 mb-2">Company</h3>
						<ul className="text-sm space-y-1">
							<li>About</li>
							<li>Contact</li>
							<li>Blogs</li>
						</ul>
					</div>
					<div className="flex-1 min-w-30">
						<h3 className="text-lg font-extrabold text-yellow-400 mb-2">Follow us</h3>
						<div className="flex gap-4 mt-2">
							<a href="#" aria-label="Facebook" className="hover:text-yellow-400"><FaFacebookF size={20} /></a>
							<a href="#" aria-label="Instagram" className="hover:text-yellow-400"><FaInstagram size={20} /></a>
							<a href="#" aria-label="Twitter" className="hover:text-yellow-400"><FaTwitter size={20} /></a>
							<a href="#" aria-label="TikTok" className="hover:text-yellow-400"><FaTiktok size={20} /></a>
						</div>
					</div>
					{/* Large KICKS background text */}
					<span className="absolute bottom-0 left-0 text-[8vw] sm:text-[6vw] md:text-[5vw] font-extrabold text-white/10 select-none pointer-events-none leading-none" style={{zIndex:0, lineHeight:'0.8'}}>KICKS</span>
				</div>
			</div>
			<div className="text-center text-xs text-gray-600 mt-4">© All rights reserved</div>
		</footer>
	);
};

export default Footer;
