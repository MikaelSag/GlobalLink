import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null, // Current logged-in user (full name)
  credentials: {}, // { [username]: password }
  profiles: {}, // { [fullName]: profileData }
  fullNameMap: {}, // { [username]: fullName }
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setCredentials: (state, action) => {
      const { username, password } = action.payload;
      state.credentials[username] = password;
    },
    setProfile: (state, action) => {
      const { fullName, profile } = action.payload;
      state.profiles[fullName] = profile;
    },
    updateProfile: (state, action) => {
      const { fullName, profile } = action.payload;
      if (state.profiles[fullName]) {
        state.profiles[fullName] = { ...state.profiles[fullName], ...profile };
      }
    },
    setFullNameMapping: (state, action) => {
      const { username, fullName } = action.payload;
      state.fullNameMap[username] = fullName;
    },
    addFriendRequest: (state, action) => {
      // Placeholder for future implementation
    },
    followEmployer: (state, action) => {
      // Placeholder for future implementation
    },
    unfollowEmployer: (state, action) => {
      // Placeholder for future implementation
    },
    deleteUser: (state, action) => {
      const fullName = action.payload;
      delete state.profiles[fullName];
    },
  },
});

export const {
  setCurrentUser,
  clearCurrentUser,
  setCredentials,
  setProfile,
  updateProfile,
  setFullNameMapping,
  addFriendRequest,
  followEmployer,
  unfollowEmployer,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
