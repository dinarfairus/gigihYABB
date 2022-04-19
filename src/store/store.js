import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../reducer/reducer';

export default configureStore({
  reducer: {
    auth: AuthSlice,
  },
});
