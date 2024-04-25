import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
    const hasToken = cookies().has('Authorization')

    if (hasToken) {
        redirect('/', RedirectType.replace)
    } else {
        return children
    }
}

export default LayoutAuth