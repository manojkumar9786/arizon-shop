import Link from "next/link"
import Image from "next/image"

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block text-black">Discover the Latest</span>
              <span className="text-rose-600">Fashion Trends</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Explore our curated collection of stylish clothing, accessories, and more. Quality products at affordable
              prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn btn-primary px-6 py-3 text-lg">
                Shop Now
              </Link>
              <Link href="#" className="btn btn-secondary px-6 py-3 text-lg">
                Learn More
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  width={40}
                  height={40}
                />
                <img
                  src="https://randomuser.me/api/portraits/men/52.jpg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  width={40}
                  height={40}
                />
                <img
                  src="https://randomuser.me/api/portraits/women/67.jpg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  width={40}
                  height={40}
                />
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">2,500+</span> happy customers
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-105">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Fashion Collection"
                className="w-full h-auto object-cover"
                width={600}
                height={400}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-white">
                  <p className="font-semibold">Summer Collection</p>
                  <p className="text-sm opacity-90">Limited time offer</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-200 rounded-full opacity-70 z-0"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-70 z-0"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <p className="text-3xl font-bold text-rose-600">15k+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-rose-600">150+</p>
              <p className="text-gray-600">Top Brands</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-rose-600">5k+</p>
              <p className="text-gray-600">Products</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-rose-600">24/7</p>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
