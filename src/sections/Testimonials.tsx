import React from 'react'
import { Star, BadgeCheck } from 'lucide-react'

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah M.',
            address: 'Austin, Texas',
            date: 'November 2025',
            rating: 5,
            testimonial: "Super easy, no medical exam. I got approved fast and now I feel so much better knowing my family's covered.",
            verified: true
        },
        {
            name: 'Michael R.',
            address: 'Portland, Oregon',
            date: 'October 2025',
            rating: 5,
            testimonial: "The whole process was way simpler than I expected. A few minutes online and I had life insurance for my family.",
            verified: true
        },
        {
            name: 'Jennifer L.',
            address: 'Phoenix, Arizona',
            date: 'December 2025',
            rating: 5,
            testimonial: "No doctor visit, no hassle. Got my policy approved quick. Huge relief for me and my kids.",
            verified: true
        }
    ]
    
    return (
        <div className='w-full py-16 bg-[#F7F7F7]'>
            <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#246a99] text-center mb-12'>
                    What Our Customers Say
                </h2>
                
                {/* Desktop Grid */}
                <div className='hidden lg:grid grid-cols-3 gap-8 w-full'>
                    {testimonials.map((testimonial, index) => (
                        <article key={index} className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col min-h-[280px]'>
                            <div className='flex items-center justify-between mb-3'>
                                <div className='flex gap-1'>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className='w-5 h-5 fill-amber-400 text-amber-400' />
                                    ))}
                                </div>
                                {testimonial.verified && (
                                    <BadgeCheck className='w-5 h-5 text-blue-500' />
                                )}
                            </div>
                            <blockquote className='text-gray-800 text-base leading-relaxed mb-6 grow'>
                                {testimonial.testimonial}
                            </blockquote>
                            <footer className='text-sm mt-auto border-t border-gray-100 pt-4'>
                                <div className='flex items-start justify-between'>
                                    <div>
                                        <p className='font-semibold text-gray-900'>{testimonial.name}</p>
                                        <p className='text-gray-600'>{testimonial.address}</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-xs text-gray-500'>{testimonial.date}</p>
                                        {testimonial.verified && (
                                            <p className='text-xs text-blue-600 font-medium mt-1'>Verified Customer</p>
                                        )}
                                    </div>
                                </div>
                            </footer>
                        </article>
                    ))}
                </div>

                {/* Mobile/Tablet Horizontal Scroll */}
                <div className='lg:hidden overflow-x-auto scrollbar-hide w-full'>
                    <div className='flex gap-6 pb-4' style={{ width: 'max-content' }}>
                        {testimonials.map((testimonial, index) => (
                            <article key={index} className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 min-w-[300px] max-w-[350px] shrink-0 flex flex-col min-h-[280px]'>
                                <div className='flex items-center justify-between mb-3'>
                                    <div className='flex gap-1'>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className='w-5 h-5 fill-amber-400 text-amber-400' />
                                        ))}
                                    </div>
                                    {testimonial.verified && (
                                        <BadgeCheck className='w-5 h-5 text-blue-500' />
                                    )}
                                </div>
                                <blockquote className='text-gray-800 text-base leading-relaxed mb-6 grow'>
                                    &ldquo;{testimonial.testimonial}&rdquo;
                                </blockquote>
                                <footer className='text-sm mt-auto'>
                                    <p className='font-semibold text-gray-900'>{testimonial.name}</p>
                                    <p className='text-gray-600'>{testimonial.address}</p>
                                </footer>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials