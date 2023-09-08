import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
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

// export default ScrollToTop;