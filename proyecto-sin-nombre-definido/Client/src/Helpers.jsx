import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getAssetById } from './redux/actions';



export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// export function FlashDetail(id) {
// const dispatch = useDispatch()
//   dispatch(getAssetById(id))  
// }

export const RouteProtected = () => {
  const token = localStorage.getItem("log")
  return(
    token ? <Outlet></Outlet> : <Navigate to={"/checkIn"}></Navigate>
  )
}

export const RouteAdminProtected = () => {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("data"))
  return(
    data.userType == "admin" ? <Outlet></Outlet> : <Navigate to={`/userPanel/${data.id}`}></Navigate>
  )
  
}
 
// export default ScrollToTop;