import { Dashboard } from '~/components/Dashboard'

import { LoginForm } from '~/components/LoginForm'
import { useUser } from '~/stores/UserStore'

export const Admin = () => {
    const user = useUser()

    return <>{user ? <Dashboard /> : <LoginForm />}</>
}
