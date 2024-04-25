import { cookies } from 'next/headers'
import React from 'react'
import { redirect, RedirectType } from 'next/navigation'

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
    const hasToken = cookies().has('Authorization')

    if (hasToken) {
        return children
    } else {
        redirect('/signin', RedirectType.replace)
    }
}

export default LayoutDashboard