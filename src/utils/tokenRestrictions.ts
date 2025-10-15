import { AllowedTokens } from '../types/design-system';

/**
 * Check if a specific token is allowed in the design system
 * @param allowedTokens - The allowedTokens configuration from the design system
 * @param category - The token category (e.g., 'colors', 'spacing', 'borderRadius')
 * @param subcategory - Optional subcategory (e.g., 'primary' for colors)
 * @param key - The specific token key (e.g., '500', 'md', 'normal')
 * @returns true if the token is allowed (or no restrictions defined), false otherwise
 */
export function isTokenAllowed(
  allowedTokens: AllowedTokens | undefined,
  category: string,
  subcategory: string | null,
  key: string
): boolean {
  // If no restrictions are defined, everything is allowed
  if (!allowedTokens) {
    return true;
  }

  // Get the category restrictions
  const categoryRestrictions = allowedTokens[category as keyof AllowedTokens];
  
  // If category has no restrictions, everything in it is allowed
  if (!categoryRestrictions) {
    return true;
  }

  // Handle nested categories (like colors)
  if (subcategory && typeof categoryRestrictions === 'object' && !Array.isArray(categoryRestrictions)) {
    const subcategoryRestrictions = (categoryRestrictions as any)[subcategory];
    
    // If subcategory has no restrictions, everything in it is allowed
    if (!subcategoryRestrictions || !Array.isArray(subcategoryRestrictions)) {
      return true;
    }
    
    // Check if the key is in the allowed list
    return (subcategoryRestrictions as string[]).includes(key);
  }

  // Handle flat categories (like spacing, borderRadius)
  if (Array.isArray(categoryRestrictions)) {
    return categoryRestrictions.includes(key);
  }

  // Default to allowed if we can't determine
  return true;
}

/**
 * Get a CSS class name for restricted tokens
 */
export function getTokenRestrictionClass(isAllowed: boolean): string {
  return isAllowed ? '' : 'token-restricted';
}

/**
 * Check if an entire category has restrictions
 */
export function hasCategoryRestrictions(
  allowedTokens: AllowedTokens | undefined,
  category: string
): boolean {
  if (!allowedTokens) {
    return false;
  }
  
  return !!allowedTokens[category as keyof AllowedTokens];
}
