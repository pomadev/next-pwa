import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { Session } from '@supabase/auth-helpers-react'
import Account from '../../components/Account'
import Head from 'next/head'
import Footer from '../../components/Footer'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}

export default function Profile({
  initialSession,
}: {
  initialSession: Session
}) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover'
        />
      </Head>
      <div className='container' style={{ padding: '50px 0 50px 0' }}>
        <Account session={initialSession} />
      </div>
      <Footer />
    </>
  )
}
