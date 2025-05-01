"use client"

import { useState, useEffect } from "react"

const ProductFilter = ({ filters, onFilterChange, products, isMobile = false }) => {
  const [categories, setCategories] = useState([])
  const [priceRange, setPriceRange] = useState(filters.priceRange)
  const [expanded, setExpanded] = useState({
    categories: true,
    price: true,
  })

  // Extract unique categories and price range from products
  useEffect(() => {
    if (products.length > 0) {
      // Get unique categories
      const uniqueCategories = [...new Set(products.map((product) => product.category))]
      setCategories(uniqueCategories)

      // Get min and max price
      const prices = products.map((product) => product.price)
      const minPrice = Math.floor(Math.min(...prices))
      const maxPrice = Math.ceil(Math.max(...prices))

      // Only update if different from current
      if (filters.priceRange[0] === 0 && filters.priceRange[1] === 1000) {
        setPriceRange([minPrice, maxPrice])
        onFilterChange({ priceRange: [minPrice, maxPrice] })
      }
    }
  }, [products])

  const handleCategoryChange = (category) => {
    onFilterChange({ category })
  }

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange]
    newPriceRange[index] = Number(e.target.value)
    setPriceRange(newPriceRange)
  }

  const applyPriceFilter = () => {
    onFilterChange({ priceRange })
  }

  const handleSearchChange = (e) => {
    onFilterChange({ searchQuery: e.target.value })
  }

  const resetFilters = () => {
    const minPrice = Math.floor(Math.min(...products.map((product) => product.price)))
    const maxPrice = Math.ceil(Math.max(...products.map((product) => product.price)))

    setPriceRange([minPrice, maxPrice])
    onFilterChange({
      category: "all",
      priceRange: [minPrice, maxPrice],
      sortBy: "default",
      searchQuery: "",
    })
  }

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${!isMobile ? "sticky top-24" : ""}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          className="input"
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold dark:text-white">Categories</h3>
          <button
            onClick={() => toggleSection("categories")}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {expanded.categories ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {expanded.categories && (
          <div className="space-y-2 transition-all duration-300">
            <div className="flex items-center">
              <input
                type="radio"
                id="category-all"
                name="category"
                checked={filters.category === "all"}
                onChange={() => handleCategoryChange("all")}
                className="mr-2"
              />
              <label htmlFor="category-all" className="text-gray-700 dark:text-gray-300">
                All Categories
              </label>
            </div>

            {categories.map((category, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${index}`}
                  name="category"
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                <label htmlFor={`category-${index}`} className="text-gray-700 dark:text-gray-300 capitalize">
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold dark:text-white">Price Range</h3>
          <button
            onClick={() => toggleSection("price")}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {expanded.price ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {expanded.price && (
          <div className="transition-all duration-300">
            <div className="flex justify-between mb-2">
              <span className="dark:text-gray-300">${priceRange[0]}</span>
              <span className="dark:text-gray-300">${priceRange[1]}</span>
            </div>

            <div className="mb-4">
              <input
                type="range"
                min={Math.floor(Math.min(...products.map((product) => product.price)) || 0)}
                max={Math.ceil(Math.max(...products.map((product) => product.price)) || 1000)}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full accent-rose-600 dark:accent-blue-600"
              />
              <input
                type="range"
                min={Math.floor(Math.min(...products.map((product) => product.price)) || 0)}
                max={Math.ceil(Math.max(...products.map((product) => product.price)) || 1000)}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full accent-rose-600 dark:accent-blue-600"
              />
            </div>

            <button onClick={applyPriceFilter} className="w-full btn btn-primary">
              Apply Filter
            </button>
          </div>
        )}
      </div>

      {!isMobile && (
        <button onClick={resetFilters} className="w-full btn btn-secondary">
          Reset All Filters
        </button>
      )}
    </div>
  )
}

export default ProductFilter
