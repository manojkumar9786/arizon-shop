"use client"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

const FullCartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  // Calculate shipping cost
  const shippingCost = cart.totalPrice > 100 ? 0 : 10

  // Calculate tax (e.g., 8%)
  const taxRate = 0.08
  const taxAmount = cart.totalPrice * taxRate

  // Calculate total
  const totalAmount = cart.totalPrice + shippingCost + taxAmount

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
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
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products" className="btn btn-primary px-6 py-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
            </div>

            <ul className="divide-y">
              {cart.items.map((item) => (
                <li key={item.id} className="p-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                            width={64}
                            height={64}
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                          <button
                            className="text-sm text-rose-600 hover:text-rose-800 mt-1 flex items-center"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="text-gray-900">${item.price.toFixed(2)}</span>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="flex justify-center items-center border rounded-md">
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm text-black">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-right">
                      <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-4 border-t flex justify-between">
              <Link href="/products" className="text-rose-600 hover:text-rose-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>

              <button className="text-gray-600 hover:text-gray-800 flex items-center" onClick={clearCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4 text-black">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-black">${cart.totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-black">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium text-black">${taxAmount.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-black.e">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {shippingCost === 0 ? "Free shipping applied" : "Free shipping on orders over $100"}
                </p>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  placeholder="Enter coupon code"
                  className="input rounded-r-none flex-grow"
                />
                <button className="bg-gray-200 text-gray-800 px-4 rounded-r-md hover:bg-gray-300 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <button className="btn btn-primary w-full py-3 mb-4">Proceed to Checkout</button>

            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2H4V4zm16 3v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V7h16zM9 9H7v9h2V9zm4 0h-2v9h2V9zm4 0h-2v9h2V9z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4zm8-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullCartPage
