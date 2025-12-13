import React from 'react';
import { useSelector } from 'react-redux';

/**
 * Example component showing how to retrieve and display 
 * base64 images from Redux store in any component
 */
const UserProfileImage = ({ username }) => {
  // Get the profile picture from Redux store
  const profilePicture = useSelector(
    (state) => state.images.profilePictures[username]
  );

  if (!profilePicture) {
    return (
      <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-gray-500 text-4xl">
          {username ? username.charAt(0).toUpperCase() : '?'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={profilePicture}
      alt={`${username}'s profile`}
      className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
    />
  );
};

export default UserProfileImage;
