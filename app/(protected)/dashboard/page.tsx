import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

const DashboardPage = () => {
  return (
    <div>
      Dashboard
      <form action={async () => {
        "use server"
        await signOut()
      }}>
        <Button type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  )
}

export default DashboardPage
