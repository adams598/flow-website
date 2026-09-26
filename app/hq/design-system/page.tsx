import { redirect } from 'next/navigation'
import { isHqAuthenticated } from '@/lib/hq/auth'
import { DesignSystemPage } from '@/components/hq/DesignSystemPage'

export const metadata = {
  title: 'Charte · Flow HQ',
}

export default async function Page() {
  if (!(await isHqAuthenticated())) redirect('/hq/login')
  return <DesignSystemPage />
}
