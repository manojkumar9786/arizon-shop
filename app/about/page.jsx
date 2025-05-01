import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Image from "next/image"

export default function About() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">About Arizon Shop</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Your trusted destination for quality products and exceptional shopping experiences.
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden h-80 md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Arizon Shop Team"
                className="object-cover w-full h-full"
                width={1200}
                height={600}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-white text-3xl md:text-4xl font-bold">Our Story</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">How It All Started</h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Founded in 2015, Arizon Shop began with a simple mission: to provide high-quality products at
                  affordable prices while delivering exceptional customer service. What started as a small online store
                  has grown into a trusted e-commerce destination serving customers worldwide.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our founder, Sarah Johnson, noticed a gap in the market for an online retailer that truly put
                  customers first. Drawing from her background in retail and technology, she assembled a team of
                  like-minded individuals who shared her passion for creating amazing shopping experiences.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Today, Arizon Shop offers thousands of products across multiple categories, from fashion and
                  electronics to home goods and beauty products. Despite our growth, we remain committed to our core
                  values of quality, affordability, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Values</h2>
              <p className="text-gray-600 dark:text-gray-400">
                The principles that guide everything we do at Arizon Shop.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-rose-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-rose-600 dark:text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Quality</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We carefully select every product in our catalog to ensure it meets our high standards for quality and
                  durability.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-rose-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-rose-600 dark:text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Customer First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our customers are at the heart of everything we do. We strive to exceed expectations with every
                  interaction.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-rose-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-rose-600 dark:text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Sustainability</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to reducing our environmental impact and promoting sustainable practices throughout
                  our business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">Meet Our Team</h2>
              <p className="text-gray-600 dark:text-gray-400">The passionate individuals behind Arizon Shop.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Founder & CEO",
                  image: "https://randomuser.me/api/portraits/women/32.jpg",
                },
                {
                  name: "Michael Chen",
                  role: "CTO",
                  image: "https://randomuser.me/api/portraits/men/46.jpg",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Head of Design",
                  image: "https://randomuser.me/api/portraits/women/65.jpg",
                },
                {
                  name: "David Kim",
                  role: "Customer Experience",
                  image: "https://randomuser.me/api/portraits/men/22.jpg",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="object-cover"
                      width={160}
                      height={160}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1 dark:text-white">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
