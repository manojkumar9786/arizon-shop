"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductQuickView from "@/components/products/ProductQuickView"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [showZoomModal, setShowZoomModal] = useState(false)
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        const data = await response.json()
        setProduct(data)

        // Fetch related products from the same category
        const relatedResponse = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(data.category)}`,
        )
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedProducts(relatedData.filter((item) => item.id !== data.id).slice(0, 4))
        }

        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value)
    setQuantity(newQuantity)
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-600 dark:border-blue-600"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-500 dark:text-red-400">Error: {error || "Product not found"}</p>
          <Link href="/products" className="mt-4 inline-block btn btn-primary">
            Back to Products
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  // Create an array of images (in a real app, you'd have multiple product images)
  const productImages = [product.image]

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center text-sm">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-blue-500">
                Home
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link
                href="/products"
                className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-blue-500"
              >
                Products
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-900 dark:text-white font-medium truncate">{product.title}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden aspect-square">
              <Image
                src={productImages[activeImage] || "/placeholder.svg"}
                alt={product.title}
                className="object-contain w-full h-full p-4"
                width={500}
                height={500}
                loading="lazy"
              />
              <button
                onClick={() => setShowZoomModal(true)}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </button>
            </div>

            {/* Thumbnail Gallery - would be used if there were multiple images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 border-2 rounded-md overflow-hidden ${
                      activeImage === index ? "border-rose-600 dark:border-blue-600" : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product thumbnail ${index + 1}`}
                      className="object-contain w-full h-full"
                      width={80}
                      height={80}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">{product.title}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  Category: <span className="capitalize">{product.category}</span>
                </span>
              </div>
              <p className="text-3xl font-bold text-rose-600 dark:text-blue-500">${product.price.toFixed(2)}</p>
            </div>

            <div className="border-t border-b py-4 border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300 mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <button
                    className="px-3 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    className="px-3 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`btn ${isAdding ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700" : "btn-primary"} px-8 py-3 flex-1 md:flex-none`}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                      Added to Cart
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
                <button className="btn btn-secondary px-8 py-3 flex-1 md:flex-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 inline"
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
                  Add to Wishlist
                </button>
              </div>
            </div>

            <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Free shipping over $100</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="card group block">
                  <div className="relative overflow-hidden pt-[100%]">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.title}
                      className="absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-rose-600 dark:group-hover:text-blue-500">
                      {relatedProduct.title}
                    </h3>
                    <p className="mt-2 font-bold text-gray-900 dark:text-white">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {showZoomModal && <ProductQuickView product={product} onClose={() => setShowZoomModal(false)} />}

      <Footer />
    </>
  )
}
