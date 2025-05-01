"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"
import ProductQuickView from "./ProductQuickView"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    setIsAdding(true)
    addToCart(product)

    // Reset the button state after a short delay
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const openQuickView = (e) => {
    e.preventDefault()
    setShowQuickView(true)
  }

  return (
    <>
      <Link
        href={`/products/${product.id}`}
        className="card group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden pt-[100%]">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            width={300}
            height={300}
            loading="lazy"
          />

          {/* Quick actions */}
          <div
            className={`absolute top-0 right-0 p-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <button
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors mb-2 dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={openQuickView}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          {/* Category tag */}
          <div className="absolute top-2 left-2">
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize dark:bg-gray-700 dark:text-gray-200">
              {product.category.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-rose-600 dark:hover:text-blue-500 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{product.rating?.rate || 4.5}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              className={`btn ${isAdding ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700" : "btn-primary"} text-sm px-3 py-1`}
              disabled={isAdding}
            >
              {isAdding ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Added
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      {showQuickView && <ProductQuickView product={product} onClose={() => setShowQuickView(false)} />}
    </>
  )
}

export default ProductCard
