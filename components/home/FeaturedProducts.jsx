"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import ProductCard from "../products/ProductCard"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [tabAnimation, setTabAnimation] = useState(false)
  const tabsRef = useRef(null)
  const activeTabRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://fakestoreapi.com/products?limit=8")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const tabRect = activeTabRef.current.getBoundingClientRect()
      const containerRect = tabsRef.current.getBoundingClientRect()

      setIndicatorStyle({
        left: `${tabRect.left - containerRect.left}px`,
        width: `${tabRect.width}px`,
      })
    }
  }, [activeTab])

  const filteredProducts =
    activeTab === "all" ? products : products.filter((product) => product.category.includes(activeTab))

  const categories = [
    { id: "all", name: "All Products" },
    { id: "men", name: "Men's Clothing" },
    { id: "women", name: "Women's Clothing" },
    { id: "jewelery", name: "Jewelry" },
    { id: "electronics", name: "Electronics" },
  ]

  const handleTabChange = (tabId) => {
    setTabAnimation(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setTabAnimation(false)
    }, 300)
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Featured Products</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of the finest products, chosen for their quality, style, and value.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-8" ref={tabsRef}>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                // style={indicatorStyle}
                ref={category.id === activeTab ? activeTabRef : null}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative bg-rose-600 dark:bg-blue-600 z-10 ${
                  activeTab === category.id
                    ? "text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => handleTabChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Active tab indicator */}
          {/* <div
            className="absolute top-0 h-full  bg-rose-600 dark:bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
            style={indicatorStyle}
          ></div> */}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600 dark:border-blue-600"></div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${tabAnimation ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/products" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
