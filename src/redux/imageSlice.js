import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    profilePictures: {}, // userId: base64Image
    projectImages: {},   // userId: [{ id, base64Image }]
  },
  reducers: {
    setProfilePicture: (state, action) => {
      const { userId, base64Image } = action.payload;
      state.profilePictures[userId] = base64Image;
    },
    removeProfilePicture: (state, action) => {
      const { userId } = action.payload;
      delete state.profilePictures[userId];
    },
    addProjectImage: (state, action) => {
      const { userId, imageId, base64Image } = action.payload;
      if (!state.projectImages[userId]) {
        state.projectImages[userId] = [];
      }
      state.projectImages[userId].push({ id: imageId, base64Image });
    },
    removeProjectImage: (state, action) => {
      const { userId, imageId } = action.payload;
      if (state.projectImages[userId]) {
        state.projectImages[userId] = state.projectImages[userId].filter(
          img => img.id !== imageId
        );
      }
    },
    clearUserImages: (state, action) => {
      const { userId } = action.payload;
      delete state.profilePictures[userId];
      delete state.projectImages[userId];
    },
  },
});

export const {
  setProfilePicture,
  removeProfilePicture,
  addProjectImage,
  removeProjectImage,
  clearUserImages,
} = imageSlice.actions;

export default imageSlice.reducer;
