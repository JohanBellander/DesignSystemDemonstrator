import { DesignSystem } from '../types/design-system';

/**
 * Load all design systems from the public/design-systems directory
 */
export async function loadDesignSystems(): Promise<DesignSystem[]> {
  const designSystemFiles = ['material', 'apple', 'github', 'tokens-studio', 'mailchimp', 'pliability', 'fitness-tracker'];
  
  const designSystems = await Promise.all(
    designSystemFiles.map(async (id) => {
      try {
        const response = await fetch(`/design-systems/${id}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${id} design system`);
        }
        const data: DesignSystem = await response.json();
        return data;
      } catch (error) {
        console.error(`Error loading design system ${id}:`, error);
        return null;
      }
    })
  );

  return designSystems.filter((ds): ds is DesignSystem => ds !== null);
}
