import Head from 'next/head'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className='container' style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <Auth
            providers={[]}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme='dark'
          />
        ) : (
          <Account />
        )}
      </div>
    </>
  )
}
