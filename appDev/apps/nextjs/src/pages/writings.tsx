import Head from 'next/head';
import { useState } from 'react';
import Nav from '../components/nav';

export default function Writings() {
	const writings = ['Project Description', 'Technical Design Document'];

	const files = ['/Writing 3.pdf', '/Writing 4.pdf'];

	const [currentFile, setCurrentFile] = useState<string>(files[0] ?? '');

	return (
		<>
			<Head>
				<title>Writings</title>
				<link rel='icon' href='/favicon32.png' />
			</Head>
			<Nav />
			<div className='grid grid-cols-2 text-white'>
				<div className='flex flex-col m-4 justify-start'>
					<div className='text-2xl mb-4'>Team Writings</div>
					<ul>
						{writings.map((writing, index) => (
							<li
								key={index}
								onClick={() => setCurrentFile(files[index] ?? '')}
								className='cursor-pointer hover:underline'
							>
								{index + 1}. {writing}
							</li>
						))}
					</ul>
				</div>
				{!!currentFile.length && (
					<div className='flex items-center justify-center'>
						<iframe src={currentFile} className='w-full h-screen'></iframe>
					</div>
				)}
			</div>
		</>
	);
}
