import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
	const router = useRouter();

	const path = router.pathname;

	return (
		<nav className='flex items-center justify-between bg-sky-500 py-2 px-4 text-xl'>
			<div className='flex text-2xl font-bold items-center gap-2'>
				<Image
					src='/favicon32.png'
					width='32px'
					height='32px'
					alt='Journey Logo'
				></Image>
				<Link href='/'>Journey</Link>
			</div>
			<div className='flex gap-4'>
				<div className={path === '/writings' ? 'underline' : ''}>
					<Link href='/writings'>Writings</Link>
				</div>
				<div className={path === '/about' ? 'underline' : ''}>
					<Link href='/about' className={path === '/about' ? 'underline' : ''}>
						About
					</Link>
				</div>
			</div>
		</nav>
	);
}
