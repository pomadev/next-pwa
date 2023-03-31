import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Footer() {
  const session = useSession()

  const router = useRouter()
  const onClickButtonLink = (path: string) => {
    router.push(path)
  }

  return (
    <>
      {!session ? (
        <div className='btm-nav bg-transparent'>
          <button
            className='btn btn-circle text-blue-700 border-white'
            onClick={() => onClickButtonLink('/login')}
          >
            ログイン
          </button>
        </div>
      ) : (
        <div
          className='btm-nav'
          style={{
            paddingBottom: 'calc(env(safe-area-inset-bottom))',
            minHeight: 'calc(64px + env(safe-area-inset-bottom))',
            backgroundColor: '#101010',
          }}
        >
          <button
            className='border-transparent rounded-none'
            onClick={() => onClickButtonLink('/')}
          >
            <Image src='/home.png' alt='home' width={30} height={30} />
          </button>
          <button
            className='border-transparent rounded-none'
            onClick={() => onClickButtonLink('/settings/profile')}
          >
            <Image src='/person.png' alt='person' width={30} height={30} />
          </button>
        </div>
      )}
    </>
  )
}
