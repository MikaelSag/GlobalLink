/**
 * Converts an Image file to a base64 string
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} - A promise that resolves with the base64 string
 */
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Validates image file size
 * @param {File} file - The image file to validate
 * @param {number} maxSizeMB - Maximum allowed size in MB (default: 5MB)
 * @returns {Object} - { valid: boolean, sizeMB: number, message: string }
 */
export const validateImageSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const valid = file.size <= maxSizeBytes;
  
  return {
    valid,
    sizeMB: parseFloat(sizeMB),
    message: valid 
      ? `File size: ${sizeMB} MB` 
      : `File too large (${sizeMB} MB). Maximum allowed: ${maxSizeMB} MB`
  };
};

/**
 * Compresses an image file
 * @param {File} file - The image file to compress
 * @param {number} maxWidth - Maximum width in pixels (default: 800)
 * @param {number} maxHeight - Maximum height in pixels (default: 800)
 * @param {number} quality - Image quality 0-1 (default: 0.8)
 * @param {number} maxBase64KB - Maximum compressed size in KB (default: 500KB for localStorage)
 * @returns {Promise<string>} - A promise that resolves with the compressed base64 string
 */
export const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8, maxBase64KB = 500) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Get compressed base64 string
        let base64String = canvas.toDataURL(file.type, quality);
        
        // Check if compressed size is too large
        const sizeKB = (base64String.length * 0.75) / 1024;
        if (sizeKB > maxBase64KB) {
          console.warn(`Compressed image is ${Math.round(sizeKB)}KB, exceeds recommended ${maxBase64KB}KB. Consider further compression.`);
        }
        
        resolve(base64String);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = e.target.result;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Handles image file input and converts to base64
 * @param {Event} event - The file input change event
 * @param {Object} options - Options for image processing
 * @param {boolean} options.compress - Whether to compress the image (default: true)
 * @param {number} options.maxWidth - Max width for compression
 * @param {number} options.maxHeight - Max height for compression
 * @param {number} options.quality - Image quality for compression
 * @returns {Promise<string>} - A promise that resolves with the base64 string
 */
export const handleImageUpload = async (event, options = {}) => {
  const {
    compress = true,
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.8,
  } = options;

  const file = event.target.files[0];
  
  if (!file) {
    throw new Error('No file selected');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  // Validate file size (5MB default)
  const sizeCheck = validateImageSize(file, 5);
  if (!sizeCheck.valid) {
    throw new Error(sizeCheck.message);
  }

  try {
    if (compress) {
      return await compressImage(file, maxWidth, maxHeight, quality);
    } else {
      return await convertImageToBase64(file);
    }
  } catch (error) {
    throw new Error(`Failed to process image: ${error.message}`);
  }
};
