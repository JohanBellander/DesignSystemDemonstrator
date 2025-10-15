import { Button } from '../demo/Button';
import { Badge } from '../demo/Badge';
import { Avatar } from '../demo/Avatar';
import styles from './DesignSystemDemo.module.css';

export function DesignSystemDemo() {
  return (
    <div className={styles.demoContainer}>
      <h2 className={styles.demoTitle}>Design System Preview</h2>
      <p className={styles.demoDescription}>
        A realistic webpage showing how this design system looks in action
      </p>
      
      <div className={styles.demo}>
        {/* Navigation */}
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
    </div>
  );
}
