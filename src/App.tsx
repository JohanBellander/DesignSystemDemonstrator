import { DesignSystemProvider, useDesignSystem } from './context/DesignSystemContext';
import { DesignSystemSelector } from './components/ui/DesignSystemSelector';
import { ComponentShowcase } from './components/ui/ComponentShowcase';
import styles from './App.module.css';

function AppContent() {
  const { isLoading, error } = useDesignSystem();

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
          <h1 className={styles.title}>Design Studio Demonstrator</h1>
          <DesignSystemSelector />
        </div>
      </header>
      <main className={styles.main}>
        <ComponentShowcase />
      </main>
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
