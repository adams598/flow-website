import { redirect } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { CoulissesPage } from '@/components/hq/CoulissesPage'

export default async function Page() {
  if (!(await isHqAuthenticated())) redirect('/hq/login')
  return <CoulissesPage />
}
