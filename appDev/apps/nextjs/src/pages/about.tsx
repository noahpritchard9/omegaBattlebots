import Head from 'next/head';
import Nav from '../components/nav';

export default function About() {
	const names = ['Kyle', 'Luisa', 'Noah', 'Sudhi'];
	return (
		<>
			<Head>
				<title>About</title>
				<link rel='icon' href='/favicon32.png' />
			</Head>
			<Nav />
			<main className='container flex flex-col items-center justify-center min-h-screen p-4 mx-auto text-white'>
				<h1 className='text-5xl md:text-[5rem] leading-normal font-extrabold text-white'>
					Senior Design Project
				</h1>
				<div className='flex items-center justify-center gap-4 mb-4 font-bold'>
					{names.map((name, index) => (
						<h3 className='text-3xl' key={index}>
							{name}
						</h3>
					))}
				</div>
				<div>
					<iframe
						src='https://docs.google.com/presentation/d/e/2PACX-1vRXo6poJL7M9pRCHqQnOoSbm_Ql5WuYClUyT3Pah-4Iz4DkwOsCwIXTorjeH7Brjq2P15jYJv-ecKOW/embed?start=false&loop=false&delayms=3000'
						width='960'
						height='569'
						allowFullScreen
					></iframe>
				</div>
			</main>
		</>
	);
}
