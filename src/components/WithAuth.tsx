import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store/store';

const withAuth = (Component: React.ComponentType) => {
  const AuthComponent = (props: React.ComponentProps<typeof Component>) => {
    const { token } = useSelector((state: RootState) => state.user);
    if (!token) {
      return <Navigate to="/auth" />;
    }
    return <Component {...props} />;
  };

  return AuthComponent;
};
export default withAuth;
