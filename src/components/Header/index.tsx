// components/layout/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "@/assets/icons/logo.svg";
import { signOut, useSession } from "next-auth/react";
import Button from "../shared/Button";
import { useState } from "react";
import clsx from "clsx";
import React from "react";

interface NavItem {
  name: string;
  path: string;
  subItems?: NavItem[]; // Optional array for nested dropdowns
}

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // FIX: Removed subItems from Blogs and News
  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blogs", path: "/blogs" }, // Now a direct link
    { name: "News", path: "/news" },   // Now a direct link
    // If you want to add sub-items to other categories later,
    // you would add them back to that specific item here.
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // activeDropdown state is still needed for other potential dropdowns or future use,
  // but for Blogs/News it won't be actively used.
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null); // Close any open desktop dropdown when mobile menu is toggled
  };

  const handleMouseEnter = (itemName: string) => setActiveDropdown(itemName);
  const handleMouseLeave = () => setActiveDropdown(null);

  const linkBaseClasses = "text-white hover:text-[#FFD700] transition-colors duration-200 text-lg md:text-base font-medium";
  const activeLinkClasses = "text-[#FFD700] font-semibold";

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-xl z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Site Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image src={Logo} alt="War Spirit Logo" width={48} height={48} className="rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300" />
          <span className="text-white text-2xl font-extrabold hidden md:inline tracking-wider group-hover:text-[#FFD700] transition-colors duration-300">
            War Spirit
          </span>
        </Link>

        {/* Hamburger Menu Button for Mobile */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none p-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Desktop Navigation and Auth Buttons */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                {/* FIX: Conditional rendering for desktop based on subItems */}
                {item.subItems ? (
                  <button
                    className={clsx(linkBaseClasses, "flex items-center gap-1 focus:outline-none", {
                      [activeLinkClasses]: router.pathname === item.path || item.subItems.some(sub => router.pathname === sub.path),
                    })}
                  >
                    {item.name}
                    {/* Down arrow icon */}
                    <svg
                      className={clsx("ml-1 w-4 h-4 transition-transform duration-200", {
                        "rotate-180": activeDropdown === item.name,
                      })}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  // FIX: Direct Link for items without subItems (like Blogs and News now)
                  <Link
                    href={item.path}
                    className={clsx(linkBaseClasses, {
                      [activeLinkClasses]: router.pathname === item.path,
                    })}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu (only if subItems exist) */}
                {/* This block will now only render if an item explicitly has subItems */}
                {item.subItems && (
                  <div
                    className={clsx(
                      "absolute left-1/2 -translate-x-1/2 mt-2 py-2 w-48 bg-gray-950 rounded-md shadow-lg transition-opacity duration-200 z-[51] border border-[#FFD700]/50",
                      {
                        "opacity-100 visible": activeDropdown === item.name,
                        "opacity-0 invisible": activeDropdown !== item.name,
                      }
                    )}
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className={clsx(
                          "block px-4 py-2 text-white hover:bg-gray-800 hover:text-[#FFD700] transition-colors duration-200",
                          {
                            "text-[#FFD700] font-semibold": router.pathname === subItem.path,
                          }
                        )}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {status === "authenticated" && session?.user?.role === "admin" && (
              <Link
                href="/dashboard"
                className={clsx(linkBaseClasses, {
                  [activeLinkClasses]: router.pathname === "/dashboard",
                })}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons for Desktop */}
          <div className="flex items-center space-x-4">
            {status === "loading" && <p className="text-sm text-gray-400">Loading...</p>}
            {status === "authenticated" ? (
              <Button
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                text="Dil"
                variant="tertiary"
                className="!px-6 !py-2 !text-base border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              />
            ) : (
              <>
                <Button
                  onClick={() => router.push("/sign-up")}
                  text="Regjistrohu"
                  variant="primary"
                  className="!px-6 !py-2 !text-base"
                />
                <Button
                  onClick={() => router.push("/sign-in")}
                  text="Kycu"
                  variant="secondary"
                  className="!px-6 !py-2 !text-base"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "md:hidden fixed top-0 left-0 w-full h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out",
          {
            "translate-x-full": !isMobileMenuOpen,
            "translate-x-0": isMobileMenuOpen,
          }
        )}
        onClick={toggleMobileMenu}
      >
        <nav
          className="bg-gray-800 h-full flex flex-col items-center p-8 space-y-6 mt-20"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {/* FIX: For mobile, items without subItems will render directly */}
              <Link
                href={item.path}
                className={clsx(linkBaseClasses, "w-full text-center py-2", {
                  [activeLinkClasses]: router.pathname === item.path,
                })}
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Link>
              {/* FIX: SubItems are still rendered linearly if they exist (though Blogs/News no longer have them) */}
              {item.subItems && (
                <div className="flex flex-col items-center w-full space-y-2 pl-4 border-l border-gray-700">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      href={subItem.path}
                      className={clsx(linkBaseClasses, "w-full text-center py-1 text-sm", {
                        [activeLinkClasses]: router.pathname === subItem.path,
                      })}
                      onClick={toggleMobileMenu}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          {status === "authenticated" && session?.user?.role === "admin" && (
            <Link
              href="/dashboard"
              className={clsx(linkBaseClasses, "w-full text-center py-2", {
                [activeLinkClasses]: router.pathname === "/dashboard",
              })}
              onClick={toggleMobileMenu}
            >
              Admin Dashboard
            </Link>
          )}

          {/* Auth Buttons for Mobile */}
          <div className="flex flex-col items-center space-y-4 mt-8 w-full">
            {status === "loading" && <p className="text-base text-gray-400">Loading...</p>}
            {status === "authenticated" ? (
              <Button
                onClick={() => {
                  signOut({ callbackUrl: "/sign-in" });
                  toggleMobileMenu();
                }}
                text="Dil"
                variant="tertiary"
                className="!w-full !px-6 !py-3 !text-base border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              />
            ) : (
              <>
                <Button
                  onClick={() => {
                    router.push("/sign-up");
                    toggleMobileMenu();
                  }}
                  text="Regjistrohu"
                  variant="primary"
                  className="!w-full !px-6 !py-3 !text-base"
                />
                <Button
                  onClick={() => {
                    router.push("/sign-in");
                    toggleMobileMenu();
                  }}
                  text="Kycu"
                  variant="secondary"
                  className="!w-full !px-6 !py-3 !text-base"
                />
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;