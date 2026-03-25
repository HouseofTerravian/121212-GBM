import { useState, useEffect, useRef } from 'react'

interface StatCounterProps {
  target: number
  label: string
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    const val = n / 1_000_000
    return val % 1 === 0 ? `${val}M` : `${val.toFixed(1)}M`
  }
  if (n >= 1_000) {
    const val = n / 1_000
    return val % 1 === 0 ? `${val}K` : `${val.toFixed(1)}K`
  }
  return n.toLocaleString()
}

export default function StatCounter({ target, label }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    const duration = 1500
    const steps = 60
    const stepTime = duration / steps
    const increment = target / steps
    let current = 0
    let step = 0

    const interval = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), target)
      setCount(current)

      if (step >= steps) {
        setCount(target)
        clearInterval(interval)
      }
    }, stepTime)

    return () => clearInterval(interval)
  }, [hasAnimated, target])

  return (
    <div className="stat-counter" ref={ref}>
      <span className="stat-counter-value">{formatNumber(count)}</span>
      <span className="stat-counter-label">{label}</span>
    </div>
  )
}
