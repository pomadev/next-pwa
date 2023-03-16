import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://lxqjnptvoxmjlwvjbqhu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4cWpucHR2b3htamx3dmpicWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTUzMTAsImV4cCI6MTk5NDUzMTMxMH0.Rpomkzefo95VUj_U68IHi2Z3rzZGp_REWx2UaWyyw4Q',
)
