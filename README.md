# Arizon Shop - E-commerce Frontend

Arizon Shop is a modern, responsive e-commerce frontend built with Next.js and Tailwind CSS. It features a clean, user-friendly interface with dark mode support, product filtering, cart functionality, and more.

## 🌟 Features

- **Responsive Design**: Fully responsive on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Product Catalog**: Browse products with filtering and sorting
- **Shopping Cart**: Add, remove, and update quantities
- **Quick View**: Preview products without leaving the page
- **Product Details**: Detailed product information with image zoom
- **Related Products**: View related products on product detail pages
- **About & Contact Pages**: Company information and contact form

## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Context API**: For state management (cart, theme)
- **FakeStore API**: For product data
- **Responsive Images**: Using Next.js Image component
- **CSS Animations**: Smooth transitions and effects

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.18.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher) or [yarn](https://yarnpkg.com/) (v1.22.0 or higher)
- [Git](https://git-scm.com/) for cloning the repository

## 🚀 Installation

Follow these steps to get the project up and running on your local machine:

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/manojkumar9786/arizon-shop
cd arizon-shop
\`\`\`

### 2. Install dependencies

Using npm:
\`\`\`bash
npm install
\`\`\`

Or using yarn:
\`\`\`bash
yarn install
\`\`\`


### 4. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔍 Features Explained

### Home Page
- Hero section with promotional content
- Featured products with category filtering
- Category showcase
- Promotional banner
- Customer testimonials

### Products Page
- Product grid with cards
- Filtering by category, price range, and search
- Sorting options (price, rating)
- Mobile-friendly filter modal
- Quick view functionality

### Product Detail Page
- Image gallery with zoom functionality
- Product information (title, price, description)
- Quantity selector
- Add to cart button
- Related products

### Shopping Cart
- Mini cart in header
- Full cart page
- Quantity adjustment
- Remove items
- Cart summary with subtotal, shipping, and tax

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference using localStorage
- Tailored color schemes for both modes
