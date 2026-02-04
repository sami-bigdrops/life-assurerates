'use client'

import { useEffect } from 'react'

const TrackingHandler = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get('utm_source')
    const utmId = urlParams.get('utm_id')
    const utmS1 = urlParams.get('utm_s1')
    const hasUtmParams = utmSource || utmId || utmS1

    if (hasUtmParams) {
      const maxAge = 30 * 24 * 60 * 60
      const secure = window.location.protocol === 'https:'
      if (utmSource) {
        document.cookie = `subid1=${encodeURIComponent(utmSource)}; path=/; max-age=${maxAge}; samesite=lax${secure ? '; secure' : ''}`
      }
      if (utmId) {
        document.cookie = `subid2=${encodeURIComponent(utmId)}; path=/; max-age=${maxAge}; samesite=lax${secure ? '; secure' : ''}`
      }
      if (utmS1) {
        document.cookie = `subid3=${encodeURIComponent(utmS1)}; path=/; max-age=${maxAge}; samesite=lax${secure ? '; secure' : ''}`
      }
      const cleanUrl = window.location.origin + window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
    }
  }, [])

  return null
}

export default TrackingHandler
