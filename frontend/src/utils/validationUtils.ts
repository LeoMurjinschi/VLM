// Phone validation
export const validatePhone = (phone: string): { valid: boolean; error?: string } => {
  if (!phone.trim()) return { valid: false, error: 'Phone number is required' };

  const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return { valid: false, error: 'Phone must be 10-15 digits (format: +XXX XXX XXX XXX)' };
  }

  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { valid: false, error: 'Phone must contain 10-15 digits' };
  }

  return { valid: true };
};

// Email validation
export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email.trim()) return { valid: false, error: 'Email is required' };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
};

// Organization/Company name validation
export const validateOrgName = (name: string, minLength = 3, maxLength = 100): { valid: boolean; error?: string } => {
  const trimmed = name.trim();

  if (!trimmed) return { valid: false, error: 'Organization name is required' };
  if (trimmed.length < minLength) return { valid: false, error: `Name must be at least ${minLength} characters` };
  if (trimmed.length > maxLength) return { valid: false, error: `Name cannot exceed ${maxLength} characters` };

  // Allow alphanumeric, spaces, hyphens, apostrophes
  const validNameRegex = /^[a-zA-Z0-9\s\-\'&.]+$/;
  if (!validNameRegex.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, numbers, spaces, hyphens, and apostrophes' };
  }

  return { valid: true };
};

// Address validation
export const validateAddress = (address: string, minLength = 10, maxLength = 200): { valid: boolean; error?: string } => {
  const trimmed = address.trim();

  if (!trimmed) return { valid: false, error: 'Address is required' };
  if (trimmed.length < minLength) return { valid: false, error: `Address must be at least ${minLength} characters` };
  if (trimmed.length > maxLength) return { valid: false, error: `Address cannot exceed ${maxLength} characters` };

  return { valid: true };
};

// City/Location validation
export const validateLocation = (location: string, minLength = 2, maxLength = 50): { valid: boolean; error?: string } => {
  const trimmed = location.trim();

  if (!trimmed) return { valid: false, error: 'City/Location is required' };
  if (trimmed.length < minLength) return { valid: false, error: `Location must be at least ${minLength} characters` };
  if (trimmed.length > maxLength) return { valid: false, error: `Location cannot exceed ${maxLength} characters` };

  // Allow letters, spaces, hyphens
  const validLocationRegex = /^[a-zA-Z\s\-]+$/;
  if (!validLocationRegex.test(trimmed)) {
    return { valid: false, error: 'Location can only contain letters, spaces, and hyphens' };
  }

  return { valid: true };
};

// Description/Mission statement validation
export const validateDescription = (text: string, minLength = 20, maxLength = 500): { valid: boolean; error?: string } => {
  const trimmed = text.trim();

  if (!trimmed) return { valid: false, error: 'This field is required' };
  if (trimmed.length < minLength) return { valid: false, error: `Must be at least ${minLength} characters` };
  if (trimmed.length > maxLength) return { valid: false, error: `Cannot exceed ${maxLength} characters` };

  return { valid: true };
};

// Operating hours validation (format: Mon-Fri 08:00 - 20:00)
export const validateOperatingHours = (hours: string): { valid: boolean; error?: string } => {
  const trimmed = hours.trim();

  if (!trimmed) return { valid: false, error: 'Operating hours are required' };
  if (trimmed.length > 100) return { valid: false, error: 'Operating hours cannot exceed 100 characters' };

  // Basic format check (allowing flexible formats)
  const timeRegex = /^\d{1,2}:\d{2}|Mon|Tue|Wed|Thu|Fri|Sat|Sun/i;
  if (!timeRegex.test(trimmed)) {
    return { valid: false, error: 'Format: Mon-Fri 08:00 - 20:00' };
  }

  return { valid: true };
};

// Transport type validation
export const validateTransportType = (type: string): { valid: boolean; error?: string } => {
  const trimmed = type.trim();

  if (!trimmed) return { valid: false, error: 'Transport type is required' };
  if (trimmed.length > 50) return { valid: false, error: 'Transport type cannot exceed 50 characters' };

  return { valid: true };
};

// Password validation
export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < 8) return { valid: false, error: 'Password must be at least 8 characters' };
  if (password.length > 128) return { valid: false, error: 'Password cannot exceed 128 characters' };

  if (!/[A-Z]/.test(password)) return { valid: false, error: 'Password must contain at least 1 uppercase letter' };
  if (!/[a-z]/.test(password)) return { valid: false, error: 'Password must contain at least 1 lowercase letter' };
  if (!/[0-9]/.test(password)) return { valid: false, error: 'Password must contain at least 1 number' };
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, error: 'Password must contain at least 1 special character (!@#$%^&*)' };
  }

  return { valid: true };
};

// File validation for avatar
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image (JPG or PNG)' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPG and PNG images are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be smaller than 5MB' };
  }

  return { valid: true };
};

// Check image dimensions
export const validateImageDimensions = (file: File): Promise<{ valid: boolean; error?: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 200 || img.height < 200) {
          resolve({ valid: false, error: 'Image must be at least 200x200 pixels' });
        } else if (img.width > 2000 || img.height > 2000) {
          resolve({ valid: false, error: 'Image cannot exceed 2000x2000 pixels' });
        } else {
          resolve({ valid: true });
        }
      };
      img.onerror = () => resolve({ valid: false, error: 'Could not read image' });
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
