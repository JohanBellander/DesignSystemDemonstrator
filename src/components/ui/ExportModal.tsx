import { useState } from 'react';
import { createExportPackage, downloadZip } from '../../utils/exportDesignSystem';
import type { DesignSystem } from '../../types/design-system';
import styles from './ExportModal.module.css';

interface ExportModalProps {
  designSystem: DesignSystem;
  onClose: () => void;
}

export function ExportModal({ designSystem, onClose }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const zipBlob = await createExportPackage(designSystem);
      const filename = `${designSystem.id}-design-system.zip`;
      downloadZip(zipBlob, filename);
      
      // Wait a bit before closing to show success
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export design system. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get allowed token info
  const { allowedTokens } = designSystem;
  const hasRestrictions = allowedTokens && Object.keys(allowedTokens).length > 0;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Export Design System</h2>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            Export this design system as a complete package ready for AI-assisted implementation in React projects.
          </p>

          <div className={styles.systemInfo}>
            <div className={styles.systemName}>{designSystem.name}</div>
            <p className={styles.systemDescription}>{designSystem.description}</p>
          </div>

          <div className={styles.includedFormats}>
            <h3 className={styles.sectionTitle}>📦 What's Included</h3>
            <ul className={styles.formatList}>
              <li className={styles.formatItem}>
                <strong>design-tokens.json</strong> - Original design system definition
              </li>
              <li className={styles.formatItem}>
                <strong>css-variables.css</strong> - CSS custom properties (works with any framework)
              </li>
              <li className={styles.formatItem}>
                <strong>scss-variables.scss</strong> - SCSS variables (for Sass projects)
              </li>
              <li className={styles.formatItem}>
                <strong>tailwind.config.js</strong> - Tailwind CSS configuration
              </li>
              <li className={styles.formatItem}>
                <strong>design-tokens.js</strong> - JavaScript/TypeScript module
              </li>
              <li className={styles.formatItem}>
                <strong>AI-IMPLEMENTATION-GUIDE.md</strong> - Comprehensive React implementation guide
              </li>
            </ul>
          </div>

          {hasRestrictions && (
            <div className={styles.tokenRestrictions}>
              <h3 className={styles.sectionTitle}>⚠️ Token Restrictions</h3>
              <p>
                <strong>This design system has specific token restrictions.</strong> Only the allowed tokens 
                are included in this export. The AI implementation guide clearly documents which tokens 
                are permitted.
              </p>
              <ul className={styles.restrictionsList}>
                {allowedTokens?.colors && (
                  <li>
                    <strong>Colors:</strong> {
                      [
                        allowedTokens.colors.primary && `Primary (${allowedTokens.colors.primary.join(', ')})`,
                        allowedTokens.colors.secondary && `Secondary (${allowedTokens.colors.secondary.join(', ')})`,
                        allowedTokens.colors.neutral && `Neutral (${allowedTokens.colors.neutral.join(', ')})`
                      ].filter(Boolean).join('; ')
                    }
                  </li>
                )}
                {allowedTokens?.typography?.fontSize && (
                  <li>
                    <strong>Font Sizes:</strong> {allowedTokens.typography.fontSize.join(', ')}
                  </li>
                )}
                {allowedTokens?.typography?.fontWeight && (
                  <li>
                    <strong>Font Weights:</strong> {allowedTokens.typography.fontWeight.join(', ')}
                  </li>
                )}
                {allowedTokens?.spacing && (
                  <li>
                    <strong>Spacing:</strong> {allowedTokens.spacing.join(', ')}
                  </li>
                )}
                {allowedTokens?.borderRadius && (
                  <li>
                    <strong>Border Radius:</strong> {allowedTokens.borderRadius.join(', ')}
                  </li>
                )}
                {allowedTokens?.shadows && (
                  <li>
                    <strong>Shadows:</strong> {allowedTokens.shadows.join(', ')}
                  </li>
                )}
                {allowedTokens?.navigationPattern && (
                  <li>
                    <strong>Navigation Pattern:</strong> {allowedTokens.navigationPattern}
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className={styles.includedFormats}>
            <h3 className={styles.sectionTitle}>🎯 Perfect For</h3>
            <ul className={styles.formatList}>
              <li className={styles.formatItem}>
                Implementing design systems in React projects with AI assistance
              </li>
              <li className={styles.formatItem}>
                Sharing design tokens with development teams
              </li>
              <li className={styles.formatItem}>
                Maintaining consistency across multiple projects
              </li>
              <li className={styles.formatItem}>
                Quick prototyping with established design systems
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footer}>
          <button 
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </button>
          <button 
            className={`${styles.button} ${styles.downloadButton}`}
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <div className={styles.loadingSpinner} />
                Generating...
              </>
            ) : (
              <>
                <span>📦</span>
                Download ZIP
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
