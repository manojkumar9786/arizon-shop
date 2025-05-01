"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const CartContext = createContext()

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        }
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
        }

        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        }
      }
    }

    case "REMOVE_FROM_CART": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (!existingItem) return state

      const updatedItems = state.items.filter((item) => item.id !== action.payload.id)

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - existingItem.quantity,
        totalPrice: state.totalPrice - existingItem.price * existingItem.quantity,
      }
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        return cartReducer(state, {
          type: "REMOVE_FROM_CART",
          payload: { id },
        })
      }

      const existingItemIndex = state.items.findIndex((item) => item.id === id)

      if (existingItemIndex === -1) return state

      const item = state.items[existingItemIndex]
      const quantityDifference = quantity - item.quantity

      const updatedItems = [...state.items]
      updatedItems[existingItemIndex] = {
        ...item,
        quantity,
      }

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalPrice: state.totalPrice + item.price * quantityDifference,
      }
    }

    case "CLEAR_CART":
      return initialState

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        Object.keys(cartReducer(initialState, { type: "" })).forEach((key) => {
          if (!(key in parsedCart)) {
            throw new Error("Invalid cart data in localStorage")
          }
        })

        // Dispatch each item to the cart
        parsedCart.items.forEach((item) => {
          for (let i = 0; i < item.quantity; i++) {
            dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity: 1 } })
          }
        })
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state))
  }, [state])

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: productId, quantity },
    })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
