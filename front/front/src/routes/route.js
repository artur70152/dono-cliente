import { useSelector } from 'react-redux';
import { Navigate, Outlet} from 'react-router-dom';

export default function RouteWrapper({ isPrivate=false, element:Element, isProvider=false, ...rest }) {
 // const signed=false;
console.log(isProvider)
 const signed = useSelector(state => state.auth.token);

 const prov = useSelector(state => state.auth.user?.provider);
console.log(prov)

  if (!signed && isPrivate) {
    return <Navigate to="/"/>;
  }

  if (signed && !isPrivate) {
    return <Outlet />;
  }

  return <div><Outlet /></div>// <-- nested routes render here
   }


