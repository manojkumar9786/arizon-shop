"use client"

import { useState } from "react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    content:
      "I absolutely love shopping at Arizon! The quality of their products is exceptional, and their customer service is top-notch. I've been a loyal customer for over a year now, and I'm always impressed with their new collections.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Blogger",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    content:
      "As someone who reviews tech products for a living, I'm quite picky about where I shop. Arizon has consistently delivered high-quality electronics at competitive prices. Their detailed product descriptions and fast shipping make them my go-to online store.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Interior Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    content:
      "The home decor collection at Arizon is simply stunning! I've furnished my entire apartment with their products, and I receive compliments all the time. Their aesthetic aligns perfectly with modern design trends.",
    rating: 4,
  },
]

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their shopping
            experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.5 20H7.5C6.83696 20 6.20107 19.7366 5.73223 19.2678C5.26339 18.7989 5 18.163 5 17.5V12.5C5 11.837 5.26339 11.2011 5.73223 10.7322C6.20107 10.2634 6.83696 10 7.5 10H12.5C13.163 10 13.7989 10.2634 14.2678 10.7322C14.7366 11.2011 15 11.837 15 12.5V27.5C15 28.163 14.7366 28.7989 14.2678 29.2678C13.7989 29.7366 13.163 30 12.5 30H7.5M32.5 20H27.5C26.837 20 26.2011 19.7366 25.7322 19.2678C25.2634 18.7989 25 18.163 25 17.5V12.5C25 11.837 25.2634 11.2011 25.7322 10.7322C26.2011 10.2634 26.837 10 27.5 10H32.5C33.163 10 33.7989 10.2634 34.2678 10.7322C34.7366 11.2011 35 11.837 35 12.5V27.5C35 28.163 34.7366 28.7989 34.2678 29.2678C33.7989 29.7366 33.163 30 32.5 30H27.5"
                  stroke="#F43F5E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col items-center text-center">
              <Image
                src={testimonials[activeIndex].image || "/placeholder.svg"}
                alt={testimonials[activeIndex].name}
                className="w-20 h-20 rounded-full object-cover mb-4"
                width={80}
                height={80}
              />
              <div className="flex mb-2">{renderStars(testimonials[activeIndex].rating)}</div>
              <p className="text-gray-700 text-lg italic mb-6">"{testimonials[activeIndex].content}"</p>
              <h3 className="font-bold text-xl">{testimonials[activeIndex].name}</h3>
              <p className="text-gray-600">{testimonials[activeIndex].role}</p>
            </div>

            <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M27.5 20H32.5C33.163 20 33.7989 20.2634 34.2678 20.7322C34.7366 21.2011 35 21.837 35 22.5V27.5C35 28.163 34.7366 28.7989 34.2678 29.2678C33.7989 29.7366 33.163 30 32.5 30H27.5C26.837 30 26.2011 29.7366 25.7322 29.2678C25.2634 28.7989 25 28.163 25 27.5V12.5C25 11.837 25.2634 11.2011 25.7322 10.7322C26.2011 10.2634 26.837 10 27.5 10H32.5M7.5 20H12.5C13.163 20 13.7989 20.2634 14.2678 20.7322C14.7366 21.2011 15 21.837 15 22.5V27.5C15 28.163 14.7366 28.7989 14.2678 29.2678C13.7989 29.7366 13.163 30 12.5 30H7.5C6.83696 30 6.20107 29.7366 5.73223 29.2678C5.26339 28.7989 5 28.163 5 27.5V12.5C5 11.837 5.26339 11.2011 5.73223 10.7322C6.20107 10.2634 6.83696 10 7.5 10H12.5"
                  stroke="#F43F5E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-rose-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
