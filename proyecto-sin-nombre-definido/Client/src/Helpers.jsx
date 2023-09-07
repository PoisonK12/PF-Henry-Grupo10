import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAssetById } from './redux/actions';

const dispatch = useDispatch()


export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function flashDetail(id) {
  dispatch(getAssetById(id))  
}

// export default ScrollToTop;