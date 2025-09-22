import React from 'react'
import { Menu } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import headerImg from '../img/header/header.png'
import { NavMenu } from './NavMenu'
import { Button } from './ui/button'
import type { NavMenuItem } from './NavMenu'

const menuItems: Array<NavMenuItem> = [
  { to: '/', label: 'Home' },
  { to: '/get-started', label: 'Get Started' },
  { to: '/championships', label: 'Championships' },
  { to: '/rules', label: 'Reglement' },
  { to: '/faq', label: 'FAQ' },
  {
    label: 'Howto',
    children: [{ to: '/howto/record-telemetry', label: 'Record Telemetry' }],
  },
  {
    to: 'https://acswui.virtual-asphalt.org/',
    label: 'ACSwui',
    external: true,
  },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  return (
    <div className="w-full flex justify-center bg-transparent mt-3">
      <div className="w-full">
        <div
          className="rounded-t-xl shadow flex flex-col items-center p-2 bg-gradient-to-r"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--va-gradient-1, #0f0c29), var(--va-gradient-2, #302b63), var(--va-gradient-3, #24243e))',
          }}
        >
          {/* Desktop: Header-Image */}
          <img
            src={headerImg}
            alt="Header Image"
            className="w-full rounded-md object-cover object-center border-b hidden md:block"
          />
          {/* Mobile: Logo und Burger */}
          <div className="w-full flex flex-col items-center py-2">
            <div className="flex md:hidden w-full items-center justify-between mb-2">
              {/* Dummy vA Logo (SVG) */}
              <span className="flex items-center h-10">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="8" fill="#0ea5e9" />
                  <text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="18"
                    fontWeight="bold"
                    dominantBaseline="middle"
                  >
                    vA
                  </text>
                </svg>
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menü öffnen"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex w-full justify-center mt-4">
              <NavMenu items={menuItems} />
            </div>
            {/* Mobile Slide-Over */}
            {mobileOpen && (
              <div className="fixed inset-0 z-50 flex">
                {/* Overlay background */}
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setMobileOpen(false)}
                />
                {/* Slide-Over Panel */}
                <div className="ml-auto h-full w-72 bg-gradient-to-br from-primary to-blue-900 shadow-2xl flex flex-col p-8 animate-slide-in-right relative rounded-l-3xl border-l-2 border-primary/40">
                  <button
                    className="absolute top-4 right-4 text-3xl hover:text-primary transition-colors"
                    aria-label="Menü schließen"
                    onClick={() => setMobileOpen(false)}
                  >
                    ×
                  </button>
                  <nav className="flex flex-col gap-6 mt-16">
                    {menuItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="text-xl font-bold px-4 py-3 rounded-xl hover:bg-primary/80 hover:text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground active:scale-95 transition-all duration-200 shadow-md"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {/* Howto Dropdown for mobile */}
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-bold px-4 py-3">Howto</span>
                      <Link
                        to="/howto/record-telemetry"
                        className="text-base px-6 py-2 rounded-lg hover:bg-primary/80 hover:text-primary-foreground transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Record Telemetry
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
