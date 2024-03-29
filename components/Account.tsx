import { useState, useEffect } from 'react'
import {
  Session,
  useUser,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Avatar from './Avatar'
import { Database } from '../types/supabase'
type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {
  session: Session
}

export default function Account({ session }: Props) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatarUrl,
  }: {
    username: Profiles['username']
    website: Profiles['website']
    avatarUrl: Profiles['avatar_url']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='form-widget'>
      <Avatar
        uid={session.user.id}
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, website, avatarUrl: url })
        }}
      />
      <div className='mb-4'>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={session.user.email} disabled />
      </div>
      <div className='mb-6'>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* <div className='mb-6'>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          type='website'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div> */}
      <div className='mb-4'>
        <button
          className='button primary block'
          onClick={() => updateProfile({ username, website, avatarUrl })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <button
          className='button block'
          onClick={async () => {
            await supabase.auth.signOut()
            router.push('/')
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
