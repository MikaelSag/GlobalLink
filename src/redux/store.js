import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import imageReducer from './imageSlice';
import userReducer from './userSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['images', 'users'], // Persist both slices
};

// Combine reducers
const rootReducer = combineReducers({
  images: imageReducer,
  users: userReducer,
});

// Apply persist to combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
        ignoredActionPaths: ['payload.base64Image'],
        ignoredPaths: ['images.profilePictures', 'images.projectImages'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
