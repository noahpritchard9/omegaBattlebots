import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import type { inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from '@acme/api'

const UserInfo: React.FC<{
	user: inferProcedureOutput<AppRouter['user']['all']>[number]
}> = ({ user }) => {
	return (
		<div className='p-4'>
			<h2 className='text-2xl font-bold text-gray-800'>{user.name}</h2>
			<p className='text-gray-600'>{user.role}</p>
		</div>
	)
}

const Home: NextPage = () => {
	const userQuery = trpc.user.all.useQuery()

	return (
		<>
			<Head>
				<title>Senior Design</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='container flex flex-col items-center justify-center min-h-screen p-4 mx-auto'>
				<h1 className='text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700'>
					Senior Design{' '}
				</h1>
				<div className='flex items-center justify-center w-full pt-6 text-2xl text-blue-500'>
					{userQuery.data ? (
						<div className='flex flex-col gap-4'>
							{userQuery.data?.map(u => {
								return <UserInfo key={u.id} user={u} />
							})}
						</div>
					) : (
						<p>Loading..</p>
					)}
				</div>
			</main>
		</>
	)
}

export default Home
