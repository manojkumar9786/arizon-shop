"use client"

import { useState, useEffect, useRef } from "react"
import ProductCard from "./ProductCard"
import ProductFilter from "./ProductFilter"

const ProductListingPage = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 1000],
    sortBy: "default",
    searchQuery: "",
  })
  const [showFilterModal, setShowFilterModal] = useState(false)
  const filterModalRef = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://fakestoreapi.com/products")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, products])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterModalRef.current && !filterModalRef.current.contains(event.target)) {
        setShowFilterModal(false)
      }
    }

    if (showFilterModal) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFilterModal])

  const applyFilters = () => {
    let result = [...products]

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter((product) => product.category.toLowerCase().includes(filters.category.toLowerCase()))
    }

    // Filter by price range
    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id)
    }

    setFilteredProducts(result)
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Our Products</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our wide range of high-quality products. Use the filters to find exactly what you're looking for.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <div className="lg:w-1/4 hidden lg:block">
          <ProductFilter filters={filters} onFilterChange={handleFilterChange} products={products} />
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="dark:text-white">Filter</span>
          </button>

          <div className="flex items-center space-x-2">
            <label htmlFor="mobile-sort" className="text-sm text-gray-600 dark:text-gray-400">
              Sort:
            </label>
            <select
              id="mobile-sort"
              className="border rounded-md px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600 dark:border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Results Summary - Desktop */}
              <div className="hidden lg:flex flex-wrap justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium dark:text-white">{filteredProducts.length}</span> of{" "}
                  <span className="font-medium dark:text-white">{products.length}</span> products
                </p>
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort" className="text-sm text-gray-600 dark:text-gray-400">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    className="border rounded-md px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                  >
                    <option value="default">Default</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">No products found matching your criteria.</p>
                  <button
                    className="mt-4 btn btn-secondary"
                    onClick={() =>
                      setFilters({
                        category: "all",
                        priceRange: [0, 1000],
                        sortBy: "default",
                        searchQuery: "",
                      })
                    }
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilterModal && (
        <>
          <div className="modal-backdrop lg:hidden"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden">
            <div
              ref={filterModalRef}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden zoom-in"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold dark:text-white">Filter Products</h3>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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

              <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
                <ProductFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  products={products}
                  isMobile={true}
                />
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setFilters({
                      category: "all",
                      priceRange: [0, 1000],
                      sortBy: "default",
                      searchQuery: "",
                    })
                  }}
                >
                  Reset
                </button>
                <button className="btn btn-primary" onClick={() => setShowFilterModal(false)}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductListingPage
