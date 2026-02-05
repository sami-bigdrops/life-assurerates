'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { track } from '@vercel/analytics/react'

const Hero = () => {
  const [zipCode, setZipCode] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  // Function to fetch user location using server-side IP detection (same as LeadProsper)
  const fetchUserLocation = useCallback(async () => {
    try {
      setIsLoadingLocation(true)
      // Use our API route that uses the same IP detection method as LeadProsper
      const response = await fetch('/api/get-location', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data.city && data.zipCode) {
        setZipCode(data.zipCode)
      } else {
        // Keep empty if location not available
        setZipCode('')
      }
      if (data.city) {
        setCity(data.city)
      } else {
        setCity('')
      }
      if (data.state) {
        setState(data.state)
      } else {
        setState('')
      }
    } catch {
      // Keep empty on error  
      setZipCode('')
      setCity('')
      setState('')
    } finally {
      setIsLoadingLocation(false)
    }
  }, [])

  // Fetch location after initial render to avoid blocking FCP
  useEffect(() => {
    // Use requestIdleCallback for better performance, fallback to setTimeout
    const scheduleLocationFetch = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => fetchUserLocation(), { timeout: 2000 })
      } else {
        setTimeout(() => fetchUserLocation(), 100)
      }
    }
    
    scheduleLocationFetch()
  }, [fetchUserLocation])

  // Function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
  }

  // Function to handle redirect
  const handleContinue = () => {
    // Validate ZIP code is exactly 5 digits
    if (!/^\d{5}$/.test(zipCode)) {
      alert('Please enter a valid 5-digit ZIP code')
      return
    }

    const redirectUrl = "/form"

    track('zip_submission', { state, zip_code: zipCode })

    window.location.href = redirectUrl
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue()
    }
  }

  return (
    <section className='flex-1 min-h-0 w-full flex flex-col justify-center bg-linear-to-b from-[#8EC4F6] to-[#FFF] mask-b-from-90% md:mask-b-from-95% lg:mask-b-from-85% py-8 px-4 md:py-16 xl:px-0'>
      <div className='w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12'>
        <div className='w-full lg:w-1/2 space-y-6'>
          <h1 className='text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#12266D] leading-tight text-center lg:text-left wrap-break-word'>
              {`Compare term life prices from trusted partners in ${city || 'your area'}`}
            </h1>
          <div className='bg-[#12266D] rounded-xl p-6 sm:p-8 max-w-2xl mx-auto lg:mx-0 shadow-2xl'>
            <p className='text-white font-semibold text-[16px] mb-6'>
              Enter your ZIP to compare rates
            </p>
            <div className='block sm:hidden space-y-4'>
              <input
                type='text'
                placeholder={isLoadingLocation ? 'Detecting your location...' : 'Zip Code e.g. 11102'}
                value={zipCode}
                onChange={(e) => {
                  const value = e.target.value
                  if (/^\d{0,5}$/.test(value)) {
                    setZipCode(value)
                  }
                }}
                onKeyPress={handleKeyPress}
                disabled={isLoadingLocation}
                className={`w-full px-4 py-4 text-gray-900 text-[18px] font-semibold rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 h-14 ${
                  isLoadingLocation ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              <button
                onClick={handleContinue}
                disabled={isLoadingLocation || !/^\d{5}$/.test(zipCode)}
                className={`w-full px-4 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-[18px] h-14 text-white ${
                  isLoadingLocation || !/^\d{5}$/.test(zipCode)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#F7782B] hover:bg-[#e06c27]'
                }`}
              >
                {isLoadingLocation ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin text-white font-extrabold"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Check Eligibility <ArrowRight className='w-4 h-4 text-white font-semibold' />
                  </>
                )}
              </button>
            </div>
            <div className='hidden sm:block relative'>
              <input
                type='text'
                placeholder={isLoadingLocation ? 'Detecting your location...' : 'Zip Code e.g. 11102'}
                value={zipCode}
                onChange={(e) => {
                  const value = e.target.value
                  if (/^\d{0,5}$/.test(value)) {
                    setZipCode(value)
                  }
                }}
                onKeyPress={handleKeyPress}
                disabled={isLoadingLocation}
                className={`w-full px-4 py-4 pr-32 text-gray-900 text-[18px] font-semibold rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 h-18 ${
                  isLoadingLocation ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              <button
                onClick={handleContinue}
                disabled={isLoadingLocation || !/^\d{5}$/.test(zipCode)}
                className={`absolute right-0 top-0 px-14 py-2 rounded-r-lg font-semibold transition-all duration-200 flex items-center gap-2 text-[18px] h-18 text-white ${
                  isLoadingLocation || !/^\d{5}$/.test(zipCode)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#F7782B] hover:bg-[#e06c27]'
                }`}
              >
                {isLoadingLocation ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin text-white font-extrabold"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Check Eligibility <ArrowRight className='w-4 h-4 text-white font-semibold' />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-1/2 flex justify-center shrink-0'>
          <Image
            src="/life-illustration.svg"
            alt="Modern city skyline with eco-friendly buildings"
            width={800}
            height={800}
            priority
            className='w-full max-w-2xl h-auto object-contain'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero