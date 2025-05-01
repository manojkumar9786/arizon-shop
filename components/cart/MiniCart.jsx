"use client"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

const MiniCart = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 max-h-[80vh] flex flex-col zoom-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-bold text-lg dark:text-white">Your Cart</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto flex-grow">
        {cart.items.length === 0 ? (
          <div className="p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
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
            <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
            <Link
              href="/products"
              className="mt-4 inline-block text-rose-600 hover:text-rose-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium"
              onClick={onClose}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.items.map((item) => (
              <li key={item.id} className="p-4 flex gap-3">
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-contain p-2"
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button
                        className="px-2 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-2 py-1 text-sm dark:text-white">{item.quantity}</span>
                      <button
                        className="px-2 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  onClick={() => removeFromCart(item.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cart.items.length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between mb-4">
            <span className="font-medium dark:text-white">Subtotal</span>
            <span className="font-bold dark:text-white">${cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/cart" className="btn btn-secondary text-center" onClick={onClose}>
              View Cart
            </Link>
            <Link href="#" className="btn btn-primary text-center" onClick={onClose}>
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default MiniCart
