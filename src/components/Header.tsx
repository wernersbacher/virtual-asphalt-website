import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import React from "react";

import headerImg from "../img/header/header.png";

import { InlineExternalLink as ExternalLink } from "./Link";
import { NavMenu } from "./NavMenu";
import type { NavMenuItem } from "./NavMenu";
import { Button } from "./ui/button";

const menuItems: Array<NavMenuItem> = [
  { to: "/", label: "Home" },
  { to: "/get-started", label: "Get Started" },
  { to: "/championships", label: "Championships" },
  { to: "/racingGallery", label: "Images" },
  { to: "/rules", label: "Reglement" },
  { to: "/faq", label: "FAQ" },
  {
    label: "Howto",
    children: [
      { to: "/howto/record-telemetry", label: "Record Telemetry" },
      { to: "/howto/create-skin", label: "Create Skin" },
      { to: "/howto/create-team", label: "Create Team" },
    ],
  },
  {
    to: "https://acswui.virtual-asphalt.org/",
    label: "ACSwui",
    external: true,
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <div className="w-full flex justify-center bg-transparent mt-3">
      <div className="w-full">
        <div
          className="rounded-t-xl shadow flex flex-col items-center gap-1 p-1 bg-gradient-to-r"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--va-gradient-1, #0f0c29), var(--va-gradient-2, #302b63), var(--va-gradient-3, #24243e))",
          }}
        >
          {/* Header-Image */}
          <img
            src={headerImg}
            alt="Header Image"
            className="w-full rounded-md object-cover object-center border-b"
          />

          {/* Mobile: Logo und Burger */}
          <div className="flex md:hidden w-full items-center pl-3">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-700 dark:from-primary dark:to-blue-200 bg-clip-text text-transparent drop-shadow-sm uppercase select-none">
              virtual-asphalt.org
            </span>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menü öffnen"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-12 h-12" />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex py-2 w-full justify-center">
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
              <div
                className="ml-auto h-full max-h-screen w-72 shadow-2xl flex flex-col p-8 animate-slide-in-right relative rounded-l-3xl border-l-2 border-primary/40
                  bg-gradient-to-br from-white to-gray-200 dark:from-[#18192a] dark:to-[#23243a] overflow-y-auto"
              >
                <button
                  className="absolute top-4 right-4 text-3xl hover:text-primary transition-colors"
                  aria-label="Menü schließen"
                  onClick={() => setMobileOpen(false)}
                >
                  ×
                </button>
                <nav className="flex flex-col gap-6 mt-16">
                  {menuItems.map((item, idx) => {
                    if (item.children && Array.isArray(item.children)) {
                      return (
                        <div
                          key={item.label || idx}
                          className="flex flex-col gap-1"
                        >
                          <span className="text-xl font-bold px-4 py-3">
                            {item.label}
                          </span>
                          {item.children.map((child, cidx) => (
                            <Link
                              key={child.to || cidx}
                              to={child.to}
                              className="text-base px-6 py-2 rounded-lg hover:bg-primary/80 hover:text-primary-foreground transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      );
                    }
                    // External links open in new tab
                    if (item.external) {
                      return (
                        <ExternalLink
                          key={item.to || idx}
                          href={item.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-bold px-4 py-3 rounded-xl hover:bg-primary/80 hover:text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground active:scale-95 transition-all duration-200 shadow-md"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </ExternalLink>
                      );
                    }
                    return (
                      <Link
                        key={item.to || idx}
                        to={item.to}
                        className="text-xl font-bold px-4 py-3 rounded-xl hover:bg-primary/80 hover:text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground active:scale-95 transition-all duration-200 shadow-md"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
