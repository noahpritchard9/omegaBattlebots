/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import Head from 'next/head';
import Nav from '../components/nav';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Journey</title>
				<link rel='icon' href='/favicon32.png' />
			</Head>
			<Nav />
			<main className='flex flex-col items-center justify-center p-2'>
				<h1 className='text-5xl md:text-[5rem] leading-normal font-extrabold text-white'>
					JOURNEY
				</h1>
				<div className='text-xl text-white border border-gray-200 rounded-2xl p-4 w-1/2'>
					Journey is a Senior Design Project by Kyle Vitale, Luisa Ball, Noah
					Pritchard, and Sudhi Swamy. We built a location-based walking app
					focused on catering routes to a user's preferences in order to give
					them the best experience possible. We are currently in beta and
					provide a mobile application available on iOS and Android to test our
					product.
				</div>
			</main>
		</>
	);
};

export default Home;
