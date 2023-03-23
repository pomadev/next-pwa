import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

export default function Login() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  if (user) {
    router.push('/')
  }

  return (
    <div className='container' style={{ padding: '50px 0 50px 0' }}>
      <Auth
        providers={[]}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme='dark'
      />
    </div>
  )
}
