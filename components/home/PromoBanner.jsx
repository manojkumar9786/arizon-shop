import Link from "next/link"
import Image from "next/image"

const PromoBanner = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 to-purple-600">
          <div className="absolute inset-0 mix-blend-overlay opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="text-white space-y-4">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Summer Sale is Here!</h2>
              <p className="text-white/90 text-lg">
                Get up to 50% off on selected items. Don't miss out on these amazing deals!
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/products" className="btn flex justify-center items-center bg-white text-rose-600 hover:bg-gray-100">
                  Shop Now
                </Link>
                <div className="flex items-center">
                  <div className="bg-white/20 px-4 py-2 rounded-lg">
                    <div className="flex gap-2 text-center">
                      <div>
                        <div className="text-2xl font-bold">02</div>
                        <div className="text-xs">Days</div>
                      </div>
                      <div className="text-xl font-bold">:</div>
                      <div>
                        <div className="text-2xl font-bold">18</div>
                        <div className="text-xs">Hours</div>
                      </div>
                      <div className="text-xl font-bold">:</div>
                      <div>
                        <div className="text-2xl font-bold">45</div>
                        <div className="text-xs">Mins</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Summer Sale"
                className="rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                width={500}
                height={300}
              />
              <div className="absolute -top-4 -right-3 bg-yellow-400 text-gray-900 rounded-full w-20 h-20 flex items-center justify-center font-bold text-xl transform rotate-12">
                <p className="ml-4">50% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner
