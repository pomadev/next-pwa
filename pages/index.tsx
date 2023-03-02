import Head from 'next/head'
import Link from 'next/link'
import { InstallButton } from '@/components/InstallButton'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-full'>
        <div className='flex flex-col justify-center items-center'>
          <Link
            href='/hello'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold w-6/12 py-2 px-4 mt-4 rounded text-center'
          >
            Link to ...
          </Link>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold w-6/12 py-2 px-4 mt-4 rounded'>
            Notification
          </button>
          <InstallButton />
        </div>
      </div>
    </>
  )
}
