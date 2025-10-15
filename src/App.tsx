import { useState } from 'react';
import { DesignSystemProvider, useDesignSystem } from './context/DesignSystemContext';
import { DesignSystemSelector } from './components/ui/DesignSystemSelector';
import { ComponentShowcase } from './components/ui/ComponentShowcase';
import { ExportModal } from './components/ui/ExportModal';
import styles from './App.module.css';

function AppContent() {
  const { isLoading, error, selectedSystem } = useDesignSystem();
  const [showExportModal, setShowExportModal] = useState(false);

  if (isLoading) {
    return <div className={styles.loading}>Loading design systems...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Design System Demonstrator</h1>
            {selectedSystem && (
              <p className={styles.description}>{selectedSystem.description}</p>
            )}
          </div>
          <div className={styles.actions}>
            <button 
              className={styles.exportButton}
              onClick={() => setShowExportModal(true)}
              disabled={!selectedSystem}
              title="Export design system for AI implementation"
            >
              <span>📦</span>
              <span>Export</span>
            </button>
            <DesignSystemSelector />
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <ComponentShowcase />
      </main>
      {showExportModal && selectedSystem && (
        <ExportModal 
          designSystem={selectedSystem}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <DesignSystemProvider>
      <AppContent />
    </DesignSystemProvider>
  );
}

export default App;
