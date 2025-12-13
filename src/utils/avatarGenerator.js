/**
 * Generates deterministic avatar colors and initials for users without profile pictures
 * This creates consistent placeholder avatars based on username
 */

// Color palette for avatars
const AVATAR_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#84cc16', // lime
  '#22c55e', // green
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#a855f7', // purple
  '#ec4899', // pink
];

/**
 * Generate a deterministic color based on a string
 * @param {string} str - The string to generate color from (typically username)
 * @returns {string} - Hex color code
 */
export const getColorFromString = (str) => {
  if (!str) return AVATAR_COLORS[0];
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

/**
 * Get initials from a name
 * @param {string} name - The full name
 * @returns {string} - Up to 2 initials
 */
export const getInitials = (name) => {
  if (!name) return '?';
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate an SVG avatar as base64 data URL
 * @param {string} name - The user's name
 * @param {number} size - Size of the avatar in pixels (default: 200)
 * @returns {string} - Base64 data URL of the SVG
 */
export const generateAvatarBase64 = (name, size = 200) => {
  const initials = getInitials(name);
  const bgColor = getColorFromString(name);
  
  // Create SVG with initials
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${bgColor}"/>
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="${size * 0.4}"
        font-weight="bold"
        fill="white"
      >${initials}</text>
    </svg>
  `;
  
  // Convert SVG to base64
  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Load default avatars for users from users.json
 * This should be called when the app loads to pre-populate avatars
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} setProfilePicture - Redux action creator
 */
export const loadDefaultAvatars = async (dispatch, setProfilePicture) => {
  try {
    const response = await fetch('/users.json');
    if (!response.ok) return;
    
    const users = await response.json();
    if (!Array.isArray(users)) return;
    
    // Generate avatar for each user
    users.forEach((user) => {
      if (user.name) {
        const avatarBase64 = generateAvatarBase64(user.name, 400);
        dispatch(setProfilePicture({
          userId: user.name,
          base64Image: avatarBase64,
        }));
      }
    });
    
    console.log(`Generated ${users.length} default avatars`);
  } catch (error) {
    console.warn('Failed to load default avatars:', error);
  }
};
