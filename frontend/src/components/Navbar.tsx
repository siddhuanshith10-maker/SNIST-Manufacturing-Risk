import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { Factory, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/supplier-risk', label: 'Supplier Risk' },
  { to: '/production-risk', label: 'Production Risk' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/recommendations', label: 'Recommendations' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-brand-600" />
              <span className="font-semibold text-gray-900 text-[15px]">BottleneckAI</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded text-[13px] font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              System Status: Operational
            </span>
          </div>
          <button
            className="md:hidden p-1.5 rounded text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="px-3 py-2 text-xs text-gray-500 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              System Status: Operational
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
