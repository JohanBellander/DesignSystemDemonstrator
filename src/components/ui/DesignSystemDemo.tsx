import { useState } from 'react';
import { Button } from '../demo/Button';
import { Badge } from '../demo/Badge';
import { Avatar } from '../demo/Avatar';
import { useDesignSystem } from '../../context/DesignSystemContext';
import styles from './DesignSystemDemo.module.css';

export function DesignSystemDemo() {
  const { selectedSystem } = useDesignSystem();
  const navigationPattern = selectedSystem?.allowedTokens?.navigationPattern || 'topbar-hamburger';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={styles.demoContainer}>
      <h2 className={styles.demoTitle}>Design System Preview</h2>
      <p className={styles.demoDescription}>
        A realistic webpage showing how this design system looks in action
      </p>
      
      <div className={styles.demo}>
        {/* Navigation - Dynamic based on pattern */}
        {(navigationPattern === 'topbar' || navigationPattern === 'topbar-hamburger') && (
          <nav className={styles.nav}>
            <div className={styles.navContent}>
              <div className={styles.logo}>Brand</div>
              <div className={styles.navLinks}>
                <a href="#" className={styles.navLink}>Products</a>
                <a href="#" className={styles.navLink}>Solutions</a>
                <a href="#" className={styles.navLink}>Pricing</a>
                <a href="#" className={styles.navLink}>About</a>
              </div>
              <div className={styles.navActions}>
                <Button variant="ghost" size="small">Sign In</Button>
                <Button variant="primary" size="small">Get Started</Button>
              </div>
            </div>
          </nav>
        )}

        {(navigationPattern === 'sidebar' || navigationPattern === 'sidebar-topbar') && (
          <>
            {navigationPattern === 'sidebar-topbar' && (
              <nav className={styles.topBar}>
                <div className={styles.topBarContent}>
                  <div className={styles.logo}>Brand</div>
                  <div className={styles.topBarRight}>
                    <button className={styles.iconButton}>🔍</button>
                    <button className={styles.iconButton}>🔔</button>
                    <button className={styles.iconButton}>👤</button>
                  </div>
                </div>
              </nav>
            )}
            <div 
              className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
              style={navigationPattern === 'sidebar-topbar' ? { top: '52px' } : undefined}
            >
              {navigationPattern === 'sidebar' && (
                <div className={styles.sidebarHeader}>
                  <div className={styles.sidebarLogo}>{isSidebarOpen ? 'Brand' : 'B'}</div>
                </div>
              )}
              <nav className={styles.sidebarNav}>
                <a href="#" className={`${styles.sidebarLink} ${styles.active}`}>
                  <span className={styles.sidebarIcon}>🏠</span>
                  {isSidebarOpen && <span>Dashboard</span>}
                </a>
                <a href="#" className={styles.sidebarLink}>
                  <span className={styles.sidebarIcon}>📊</span>
                  {isSidebarOpen && <span>Analytics</span>}
                </a>
                <a href="#" className={styles.sidebarLink}>
                  <span className={styles.sidebarIcon}>👥</span>
                  {isSidebarOpen && <span>Users</span>}
                </a>
                <a href="#" className={styles.sidebarLink}>
                  <span className={styles.sidebarIcon}>⚙️</span>
                  {isSidebarOpen && <span>Settings</span>}
                </a>
              </nav>
              <button className={styles.sidebarToggle} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            </div>
          </>
        )}

        {navigationPattern === 'hamburger' && (
          <>
            <nav className={styles.nav}>
              <div className={styles.navContent}>
                <button className={styles.hamburger} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <span className={styles.hamburgerLine}></span>
                  <span className={styles.hamburgerLine}></span>
                  <span className={styles.hamburgerLine}></span>
                </button>
                <div className={styles.logo}>Brand</div>
                <div style={{ width: '40px' }}></div>
              </div>
            </nav>
            {isMobileMenuOpen && (
              <div className={styles.mobileMenu}>
                <a href="#" className={styles.mobileLink}>Products</a>
                <a href="#" className={styles.mobileLink}>Solutions</a>
                <a href="#" className={styles.mobileLink}>Pricing</a>
                <a href="#" className={styles.mobileLink}>About</a>
              </div>
            )}
          </>
        )}

        {navigationPattern === 'minimal' && (
          <div className={styles.minimalHeader}>
            <div className={styles.logo}>Brand</div>
          </div>
        )}

        {/* Content Wrapper - adjusts for sidebar */}
        <div 
          className={styles.contentWrapper}
          style={{
            marginLeft: (navigationPattern === 'sidebar' || navigationPattern === 'sidebar-topbar') 
              ? (isSidebarOpen ? '200px' : '60px') 
              : '0',
            marginTop: navigationPattern === 'sidebar-topbar' ? '52px' : '0'
          }}
        >
          {/* Hero Section */}
          <section className={styles.hero}>
          <div className={styles.heroContent}>
            <Badge variant="primary">New Release</Badge>
            <h1 className={styles.heroTitle}>
              Build better products with our design system
            </h1>
            <p className={styles.heroDescription}>
              A comprehensive collection of reusable components and patterns that help teams 
              create consistent, accessible user experiences faster than ever.
            </p>
            <div className={styles.heroActions}>
              <Button variant="primary" size="large">Start Building</Button>
              <Button variant="outline" size="large">View Demo</Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className={styles.features}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3 className={styles.featureTitle}>Beautiful Design</h3>
              <p className={styles.featureText}>
                Carefully crafted components with attention to detail and aesthetics.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Lightning Fast</h3>
              <p className={styles.featureText}>
                Optimized for performance with minimal bundle size and quick load times.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>♿</div>
              <h3 className={styles.featureTitle}>Accessible</h3>
              <p className={styles.featureText}>
                Built with accessibility in mind, following WCAG guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.content}>
          <div className={styles.contentCard}>
            <div className={styles.contentHeader}>
              <div className={styles.authorInfo}>
                <Avatar size="medium" />
                <div className={styles.authorDetails}>
                  <div className={styles.authorName}>Sarah Johnson</div>
                  <div className={styles.authorRole}>Product Designer</div>
                </div>
              </div>
              <Badge variant="success">Featured</Badge>
            </div>
            <h3 className={styles.contentTitle}>
              How we redesigned our entire platform in 3 months
            </h3>
            <p className={styles.contentDescription}>
              Learn about our journey building a cohesive design system from scratch 
              and how it transformed our team's productivity and product quality.
            </p>
            <div className={styles.contentFooter}>
              <Button variant="outline" size="small">Read More</Button>
              <span className={styles.contentMeta}>5 min read</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <div className={styles.footerLogo}>Brand</div>
              <p className={styles.footerText}>
                Building beautiful digital experiences
              </p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerHeading}>Product</h4>
                <a href="#" className={styles.footerLink}>Features</a>
                <a href="#" className={styles.footerLink}>Pricing</a>
                <a href="#" className={styles.footerLink}>Updates</a>
              </div>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerHeading}>Company</h4>
                <a href="#" className={styles.footerLink}>About</a>
                <a href="#" className={styles.footerLink}>Careers</a>
                <a href="#" className={styles.footerLink}>Contact</a>
              </div>
            </div>
          </div>
        </footer>
        </div>
        {/* End Content Wrapper */}
      </div>
    </div>
  );
}
