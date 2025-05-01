"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useTheme } from "@/context/ThemeContext"
import MiniCart from "@/components/cart/MiniCart"
import { usePathname } from "next/navigation"

const Header = () => {
  const { cart } = useCart()
  const { theme, toggleTheme } = useTheme()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef(null)
  const cartRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      if (cartRef.current && !cartRef.current.contains(event.target) && !event.target.closest("[data-cart-toggle]")) {
        setIsCartOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isCartOpen) setIsCartOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md dark:bg-gray-800 dark:shadow-gray-900" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-rose-600 dark:text-blue-500">Arizon</span>
            <span className="text-2xl font-light dark:text-gray-300">Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                pathname === "/"
                  ? "text-rose-600 dark:text-blue-500"
                  : "text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`font-medium transition-colors ${
                pathname === "/products"
                  ? "text-rose-600 dark:text-blue-500"
                  : "text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
              }`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors ${
                pathname === "/about"
                  ? "text-rose-600 dark:text-blue-500"
                  : "text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-rose-600 dark:text-blue-500"
                  : "text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Cart, Theme Toggle and Mobile Menu Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-gray-700 hover:text-rose-600 transition-colors dark:text-gray-300 dark:hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-rose-600 transition-colors dark:text-gray-300 dark:hover:text-blue-500"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Cart Icon */}
            <button
              className="p-2 text-gray-700 hover:text-rose-600 transition-colors relative dark:text-gray-300 dark:hover:text-blue-500"
              onClick={toggleCart}
              data-cart-toggle="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center dark:bg-blue-600">
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-gray-700 hover:text-rose-600 transition-colors md:hidden dark:text-gray-300 dark:hover:text-blue-500"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <>
            <div className="modal-backdrop md:hidden" onClick={() => setIsMenuOpen(false)}></div>
            <div ref={sidebarRef} className={`mobile-sidebar ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
              <div className="p-5">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className={`font-medium transition-colors ${
                      pathname === "/"
                        ? "text-rose-600 dark:text-blue-500"
                        : "text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className={`font-medium transition-colors ${
                      pathname === "/products"
                        ? "text-rose-600 dark:text-blue-500"
                        : "text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    href="/about"
                    className={`font-medium transition-colors ${
                      pathname === "/about"
                        ? "text-rose-600 dark:text-blue-500"
                        : "text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className={`font-medium transition-colors ${
                      pathname === "/contact"
                        ? "text-rose-600 dark:text-blue-500"
                        : "text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-blue-500"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dark Mode</span>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        theme === "dark" ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          theme === "dark" ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mini Cart */}
        {isCartOpen && (
          <div className="absolute right-4 top-16 z-50" ref={cartRef}>
            <MiniCart onClose={() => setIsCartOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
