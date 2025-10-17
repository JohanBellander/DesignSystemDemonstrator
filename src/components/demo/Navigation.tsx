import { useState } from 'react';
import { Button } from './Button';
import { useDesignSystem } from '../../context/DesignSystemContext';
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Navigation.module.css';
import animationStyles from '../../styles/animations.module.css';

// Navigation patterns showcase component
export function NavigationDemo() {
  const { selectedSystem } = useDesignSystem();
  const allowedPattern = selectedSystem?.allowedTokens?.navigationPattern || 'topbar-hamburger';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const navigation = selectedSystem?.tokens.navigation;

  const patternLabels: Record<string, string> = {
    'topbar': 'Top Bar',
    'sidebar': 'Sidebar',
    'hamburger': 'Hamburger',
    'topbar-hamburger': 'Top Bar + Hamburger (Responsive)',
    'sidebar-topbar': 'Sidebar + Top Bar',
    'minimal': 'Minimal / No Navigation'
  };

  const handleCopyToken = (tokenName: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className={styles.navigationDemo}>
      {/* Pattern Info */}
      <div className={styles.patternInfo}>
        <h3 className={styles.patternTitle}>
          Navigation Pattern: <span className={styles.patternName}>{patternLabels[allowedPattern]}</span>
        </h3>
        <p className={styles.patternDescription}>
          This design system uses the {patternLabels[allowedPattern].toLowerCase()} pattern for navigation.
        </p>
      </div>

      {/* Pattern Preview */}
      <div className={`${styles.patternPreview} ${styles[`preview-${allowedPattern}`]}`}>
        {allowedPattern === 'topbar' && (
          <TopBarNavigation />
        )}
        
        {allowedPattern === 'sidebar' && (
          <SidebarNavigation isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        )}
        
        {allowedPattern === 'hamburger' && (
          <HamburgerNavigation isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        )}
        
        {allowedPattern === 'topbar-hamburger' && (
          <TopBarWithHamburger />
        )}
        
        {allowedPattern === 'sidebar-topbar' && (
          <SidebarWithTopBar />
        )}
        
        {allowedPattern === 'minimal' && (
          <MinimalNavigation />
        )}
      </div>

      {/* Token Values Section */}
      {navigation && (
        <div className={styles.tokenSection}>
          <h3 className={styles.tokenSectionTitle}>Navigation Token Values</h3>
          <p className={styles.tokenSectionDescription}>
            Below are all the navigation-specific design tokens and their computed values for this design system.
          </p>
          
          <div className={styles.tokenTable}>
            <div className={styles.tokenTableHeader}>
              <div className={styles.tokenTableCell}>Token Name</div>
              <div className={styles.tokenTableCell}>Value</div>
              <div className={styles.tokenTableCell}>Preview</div>
            </div>
            
            {navigation.backgroundColor && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>backgroundColor</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('backgroundColor', navigation.backgroundColor!)}
                  >
                    {navigation.backgroundColor}
                  </code>
                  {copiedToken === 'backgroundColor' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <div 
                    className={styles.colorPreview}
                    style={{ backgroundColor: navigation.backgroundColor }}
                  />
                </div>
              </div>
            )}
            
            {navigation.textColor && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>textColor</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('textColor', navigation.textColor!)}
                  >
                    {navigation.textColor}
                  </code>
                  {copiedToken === 'textColor' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <div 
                    className={styles.colorPreview}
                    style={{ backgroundColor: navigation.textColor }}
                  />
                </div>
              </div>
            )}
            
            {navigation.activeColor && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>activeColor</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('activeColor', navigation.activeColor!)}
                  >
                    {navigation.activeColor}
                  </code>
                  {copiedToken === 'activeColor' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <div 
                    className={styles.colorPreview}
                    style={{ backgroundColor: navigation.activeColor }}
                  />
                </div>
              </div>
            )}
            
            {navigation.hoverColor && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>hoverColor</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('hoverColor', navigation.hoverColor!)}
                  >
                    {navigation.hoverColor}
                  </code>
                  {copiedToken === 'hoverColor' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <div 
                    className={styles.colorPreview}
                    style={{ backgroundColor: navigation.hoverColor }}
                  />
                </div>
              </div>
            )}
            
            {navigation.borderColor && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>borderColor</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('borderColor', navigation.borderColor!)}
                  >
                    {navigation.borderColor}
                  </code>
                  {copiedToken === 'borderColor' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <div 
                    className={styles.colorPreview}
                    style={{ backgroundColor: navigation.borderColor }}
                  />
                </div>
              </div>
            )}
            
            {navigation.height && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>height</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('height', navigation.height!)}
                  >
                    {navigation.height}
                  </code>
                  {copiedToken === 'height' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <div className={styles.dimensionPreview}>
                    <div 
                      className={styles.dimensionBar}
                      style={{ height: navigation.height, width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {navigation.padding && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>padding</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('padding', navigation.padding!)}
                  >
                    {navigation.padding}
                  </code>
                  {copiedToken === 'padding' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <span className={styles.textPreview}>{navigation.padding}</span>
                </div>
              </div>
            )}
            
            {navigation.gap && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>gap</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('gap', navigation.gap!)}
                  >
                    {navigation.gap}
                  </code>
                  {copiedToken === 'gap' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <span className={styles.textPreview}>{navigation.gap}</span>
                </div>
              </div>
            )}
            
            {navigation.fontWeight && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>fontWeight</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('fontWeight', navigation.fontWeight!)}
                  >
                    {navigation.fontWeight}
                  </code>
                  {copiedToken === 'fontWeight' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <span 
                    className={styles.textPreview}
                    style={{ fontWeight: navigation.fontWeight }}
                  >
                    Navigation
                  </span>
                </div>
              </div>
            )}
            
            {navigation.fontSize && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>fontSize</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('fontSize', navigation.fontSize!)}
                  >
                    {navigation.fontSize}
                  </code>
                  {copiedToken === 'fontSize' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <span 
                    className={styles.textPreview}
                    style={{ fontSize: navigation.fontSize }}
                  >
                    Navigation
                  </span>
                </div>
              </div>
            )}
            
            {navigation.borderRadius && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>borderRadius</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('borderRadius', navigation.borderRadius!)}
                  >
                    {navigation.borderRadius}
                  </code>
                  {copiedToken === 'borderRadius' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <div 
                    className={styles.radiusPreview}
                    style={{ borderRadius: navigation.borderRadius }}
                  />
                </div>
              </div>
            )}
            
            {navigation.shadow && (
              <div className={styles.tokenTableRow}>
                <div className={styles.tokenTableCell}>
                  <code className={styles.tokenName}>shadow</code>
                </div>
                <div className={styles.tokenTableCell}>
                  <code 
                    className={styles.tokenValue}
                    onClick={() => handleCopyToken('shadow', navigation.shadow!)}
                  >
                    {navigation.shadow}
                  </code>
                  {copiedToken === 'shadow' && (
                    <span className={styles.copiedIndicator}>✓</span>
                  )}
                </div>
                <div className={styles.tokenTableCell}>
                  <div 
                    className={styles.shadowPreview}
                    style={{ boxShadow: navigation.shadow }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

// Top Bar Navigation Pattern
function TopBarNavigation() {
  return (
    <div className={styles.mockSite}>
      <nav className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.logo}>Brand</div>
          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>Home</a>
            <a href="#" className={styles.navLink}>Products</a>
            <a href="#" className={styles.navLink}>About</a>
            <a href="#" className={styles.navLink}>Contact</a>
          </div>
          <div className={styles.navActions}>
            <Button variant="ghost" size="small">Sign In</Button>
            <Button variant="primary" size="small">Sign Up</Button>
          </div>
        </div>
      </nav>
      <div className={styles.contentArea}>
        <h2>Top Bar Navigation</h2>
        <p>Classic horizontal navigation bar at the top. Best for desktop-first sites with limited navigation items.</p>
        <ul className={styles.featureList}>
          <li>Always visible</li>
          <li>Easy to scan</li>
          <li>Good for 4-7 main items</li>
          <li>Limited space on mobile</li>
        </ul>
      </div>
    </div>
  );
}

// Sidebar Navigation Pattern
function SidebarNavigation({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={styles.mockSite}>
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>{isOpen ? 'Brand' : 'B'}</div>
        </div>
        <nav className={styles.sidebarNav}>
          <a href="#" className={`${styles.sidebarLink} ${styles.active}`}>
            {isOpen && <span>Dashboard</span>}
            {!isOpen && <span>D</span>}
          </a>
          <a href="#" className={styles.sidebarLink}>
            {isOpen && <span>Analytics</span>}
            {!isOpen && <span>A</span>}
          </a>
          <a href="#" className={styles.sidebarLink}>
            {isOpen && <span>Users</span>}
            {!isOpen && <span>U</span>}
          </a>
          <a href="#" className={styles.sidebarLink}>
            {isOpen && <span>Settings</span>}
            {!isOpen && <span>S</span>}
          </a>
        </nav>
        <button className={styles.sidebarToggle} onClick={onToggle}>
          {isOpen ? '‹' : '›'}
        </button>
      </div>
      <div className={styles.contentArea} style={{ marginLeft: isOpen ? '240px' : '80px' }}>
        <h2>Sidebar Navigation</h2>
        <p>Vertical navigation panel on the side. Perfect for admin dashboards and applications with many sections.</p>
        <ul className={styles.featureList}>
          <li>Great for many items</li>
          <li>Can be collapsed</li>
          <li>Text labels</li>
          <li>Good for apps</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          <Button variant="outline" size="small" onClick={onToggle}>
            {isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          </Button>
        </p>
      </div>
    </div>
  );
}

// Hamburger Menu Pattern
function HamburgerNavigation({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={styles.mockSite}>
      <nav className={styles.topBar}>
        <div className={styles.topBarContent}>
          <button className={styles.hamburger} onClick={onToggle}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
          <div className={styles.logo}>Brand</div>
          <div style={{ width: '40px' }}></div> {/* Spacer for centering */}
        </div>
      </nav>
      {isOpen && (
        <div className={styles.mobileMenu}>
          <a href="#" className={styles.mobileLink}>Home</a>
          <a href="#" className={styles.mobileLink}>Products</a>
          <a href="#" className={styles.mobileLink}>Services</a>
          <a href="#" className={styles.mobileLink}>About</a>
          <a href="#" className={styles.mobileLink}>Contact</a>
          <div className={styles.mobileActions}>
            <Button variant="outline" size="small">Sign In</Button>
            <Button variant="primary" size="small">Sign Up</Button>
          </div>
        </div>
      )}
      <div className={styles.contentArea}>
        <h2>Hamburger Menu</h2>
        <p>Hidden menu that expands when clicked. Common on mobile-first or minimalist sites.</p>
        <ul className={styles.featureList}>
          <li>Clean, minimal look</li>
          <li>Saves screen space</li>
          <li>Mobile-friendly</li>
          <li>Requires extra click</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          <Button variant="outline" size="small" onClick={onToggle}>
            {isOpen ? 'Close Menu' : 'Open Menu'}
          </Button>
        </p>
      </div>
    </div>
  );
}

// Top Bar + Hamburger (Responsive Pattern)
function TopBarWithHamburger() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className={styles.mockSite}>
      <nav className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.logo}>Brand</div>
          {/* Desktop: Full nav */}
          <div className={styles.navLinksResponsive}>
            <a href="#" className={styles.navLink}>Home</a>
            <a href="#" className={styles.navLink}>Products</a>
            <a href="#" className={styles.navLink}>About</a>
            <a href="#" className={styles.navLink}>Contact</a>
          </div>
          {/* Mobile: Hamburger */}
          <button className={styles.hamburgerResponsive} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
          <div className={styles.navActionsResponsive}>
            <Button variant="ghost" size="small">Sign In</Button>
            <Button variant="primary" size="small">Sign Up</Button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#" className={styles.mobileLink}>Home</a>
          <a href="#" className={styles.mobileLink}>Products</a>
          <a href="#" className={styles.mobileLink}>About</a>
          <a href="#" className={styles.mobileLink}>Contact</a>
        </div>
      )}
      <div className={styles.contentArea}>
        <h2>Top Bar + Hamburger (Responsive)</h2>
        <p>Desktop shows full navigation, mobile uses hamburger. Best of both worlds for responsive sites.</p>
        <ul className={styles.featureList}>
          <li>Optimal for each device</li>
          <li>Full nav on desktop</li>
          <li>Clean mobile experience</li>
          <li>Most common pattern</li>
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>
          Note: Resize your browser window to see the responsive behavior
        </p>
      </div>
    </div>
  );
}

// Sidebar + Top Bar Pattern
function SidebarWithTopBar() {
  return (
    <div className={styles.mockSite}>
      <nav className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.logo}>Brand</div>
          <div style={{ flex: 1 }}></div>
          <div className={styles.topBarRight}>
            <button className={styles.iconButton}>Search</button>
            <button className={styles.iconButton}>Alerts</button>
            <button className={styles.iconButton}>Profile</button>
          </div>
        </div>
      </nav>
      <div className={`${styles.sidebar} ${styles.sidebarOpen}`} style={{ top: '60px' }}>
        <nav className={styles.sidebarNav}>
          <a href="#" className={`${styles.sidebarLink} ${styles.active}`}>
            <span>Dashboard</span>
          </a>
          <a href="#" className={styles.sidebarLink}>
            <span>Reports</span>
          </a>
          <a href="#" className={styles.sidebarLink}>
            <span>Projects</span>
          </a>
          <a href="#" className={styles.sidebarLink}>
            <span>Team</span>
          </a>
        </nav>
      </div>
      <div className={styles.contentArea} style={{ marginLeft: '240px', marginTop: '60px' }}>
        <h2>Sidebar + Top Bar</h2>
        <p>Combines vertical sidebar with horizontal top bar. Common in complex dashboards and admin panels.</p>
        <ul className={styles.featureList}>
          <li>Maximum navigation space</li>
          <li>Top bar for user actions</li>
          <li>Sidebar for main sections</li>
          <li>Professional look</li>
        </ul>
      </div>
    </div>
  );
}

// Minimal/No Navigation Pattern
function MinimalNavigation() {
  return (
    <div className={styles.mockSite}>
      <div className={styles.minimalHeader}>
        <div className={styles.logo}>Brand</div>
      </div>
      <div className={styles.contentArea}>
        <h2>Minimal / No Navigation</h2>
        <p>Landing pages, coming soon pages, or single-focus pages with minimal or no navigation.</p>
        <ul className={styles.featureList}>
          <li>Maximum focus</li>
          <li>Clean, distraction-free</li>
          <li>Good for conversions</li>
          <li>Single-purpose pages</li>
        </ul>
        <div style={{ marginTop: '2rem' }}>
          <Button variant="primary" size="large">Get Started</Button>
        </div>
      </div>
    </div>
  );
}
