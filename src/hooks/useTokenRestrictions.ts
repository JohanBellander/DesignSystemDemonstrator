import { useDesignSystem } from '../context/DesignSystemContext';
import { isTokenAllowed } from '../utils/tokenRestrictions';

/**
 * Hook to check if specific tokens are allowed in the current design system
 */
export function useTokenRestrictions() {
  const { selectedSystem } = useDesignSystem();
  
  const checkToken = (
    category: string,
    subcategory: string | null,
    key: string
  ): boolean => {
    return isTokenAllowed(
      selectedSystem?.allowedTokens,
      category,
      subcategory,
      key
    );
  };

  const hasRestrictions = !!selectedSystem?.allowedTokens;

  const getTokenClass = (
    category: string,
    subcategory: string | null,
    key: string
  ): string => {
    if (!hasRestrictions) return '';
    const allowed = checkToken(category, subcategory, key);
    return allowed ? '' : 'token-restricted';
  };

  return {
    checkToken,
    hasRestrictions,
    getTokenClass,
    allowedTokens: selectedSystem?.allowedTokens,
  };
}
