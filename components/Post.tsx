import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../types/supabase'
type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {
  username: string | null
  avatarUrl: string | null
  content: string | null
}

export const Post = ({ username, avatarUrl, content }: Props) => {
  const supabase = useSupabaseClient<Database>()
  const [url, setUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl)
  }, [avatarUrl])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }
  return (
    <div className='pb-3'>
      <div className='card bg-gray-600'>
        <div className='card-title'>
          <div className='flex justify-between items-center space-x-4'>
            <img
              src={url || '/noimage.png'}
              alt='Avatar'
              className='h-16 w-16 rounded-full'
            />
            <p>{username}</p>
          </div>
        </div>
        <div className='card-body whitespace-pre-wrap'>{content}</div>
      </div>
    </div>
  )
}
