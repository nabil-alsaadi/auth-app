import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';

export const useAuthState = () => {
  return useSelector(
    (state: RootState) => ({
      loading: state.user.loading,
      error: state.user.error,
      success: state.user.token !== null,
    }),
    shallowEqual // To compare the selector results deeply and prevent unnecessary re-renders
  );
};
