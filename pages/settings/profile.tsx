import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { Session } from '@supabase/auth-helpers-react'
import Account from '../../components/Account'

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
    <div className='container' style={{ padding: '50px 0 50px 0' }}>
      <Account session={initialSession} />
    </div>
  )
}
