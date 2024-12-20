import {useAuth} from "../contex/auth"
import {Navigate, Outlet} from 'react-router-dom'
export default function PrivateRoute() {

const {isAuth}  = useAuth()

if(isAuth) return <Outlet/>
else return <Navigate to="/login" replace />
}
