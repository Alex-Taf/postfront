"use client"

import { userCheck } from '@/app/api/user'
import { IDecoded } from '@/app/store/user'
import { StorageController } from '@/app/utils/storage'
import { jwtDecode } from 'jwt-decode'
import { usePathname, useRouter } from 'next/navigation'

const RequireAuth = ({children}) => {
    const router = useRouter()

    try {
        const routeName = usePathname()
        const guestRoutes = ['/login', '/registration']

        const storage = new StorageController()

        const auth = Boolean(storage.get('auth'))
        const token = storage.get('token')

        const decoded = jwtDecode<IDecoded>(token)
        console.log(decoded)

        userCheck(decoded.id).then((res) => {
            if (!auth && !res.data?.login && !guestRoutes.includes(routeName)) {
                router.push('/login')
            }

            if (auth && res.data?.login && guestRoutes.includes(routeName)) {
                router.push('/posts')
            }
        })
    } catch (err) {

    }

    return children
}

export default RequireAuth;
