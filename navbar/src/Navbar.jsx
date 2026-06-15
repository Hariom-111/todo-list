import { useEffect, useId, useMemo, useState } from 'react';

import './navbar.css';

const defaultNavItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({
  brand = 'MyLogo',
  items = defaultNavItems,
  logoText = null,
}) {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const menuId = useMemo(() => `nav-menu-${buttonId}`.replace(/:/g, ''), [buttonId]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function onNavigate() {
    setOpen(false);
  }

  return (
    <header className="navWrap">
      <div className="navInner">
        <a className="navBrand" href="#home" onClick={onNavigate} aria-label="Go to home">
          <span className="navLogoMark" aria-hidden="true" />
          <span className="navBrandText">{logoText ?? brand}</span>
        </a>

        <button
          type="button"
          className="navHamburger"
          aria-controls={menuId}
          aria-expanded={open}
          id={buttonId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="navHamburgerBar" />
          <span className="navHamburgerBar" />
          <span className="navHamburgerBar" />
          <span className="srOnly">Toggle navigation</span>
        </button>

        <nav className="navLinks" id={menuId} aria-label="Primary" data-open={open}>
          <ul className="navList">
            {items.map((it) => (
              <li key={it.href} className="navItem">
                <a
                  className="navLink"
                  href={it.href}
                  onClick={onNavigate}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navCtas">
            <a className="navCta navCtaGhost" href="#pricing" onClick={onNavigate}>
              Sign up
            </a>
            <a className="navCta" href="#contact" onClick={onNavigate}>
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

