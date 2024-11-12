import { AdminEventsDashboard } from '~/components/AdminEvents/AdminEventsDashboard'
import { LoginForm } from '~/components/LoginForm'
import { useUser } from '~/stores/UserStore'

export const AdminEvents = () => {
    const user = useUser()

    return <>{user ? <AdminEventsDashboard /> : <LoginForm />}</>
}
