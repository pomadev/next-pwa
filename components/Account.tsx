import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Account() {
  const supabase = useSupabaseClient()

  return (
    <div className='form-widget'>
      <div>
        <button
          className='button block'
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
