"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Twitter, Github, Linkedin, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { subscribeToBrevo } from "./actions/subscribe"

export default function ComingSoonPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([])
  const [isMounted, setIsMounted] = useState(false)
  const [state, formAction, isPending] = useActionState(subscribeToBrevo, { success: false, message: "" })

  // Client-side initialization
  useEffect(() => {
    // Mark component as mounted on client
    setIsMounted(true)
    
    // Generate particles with fixed random values
    const newParticles = Array(30).fill(null).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`
    }))
    
    setParticles(newParticles)
  }, [])
  
  // Smooth mouse tracking with CSS custom properties
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update CSS custom properties for smooth hardware-accelerated animations
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`)

      // Update state for other interactions (less frequently)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      document.documentElement.style.setProperty("--cursor-scale", "2.5")
    }

    const handleMouseUp = () => {
      setIsClicking(false)
      document.documentElement.style.setProperty("--cursor-scale", "1")
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden cursor-none">
      <style jsx global>{`
  :root {
    --mouse-x: 0px;
    --mouse-y: 0px;
    --cursor-scale: 1;
  }
  
  .cursor-dot {
    left: calc(var(--mouse-x) - 12px);
    top: calc(var(--mouse-y) - 12px);
    transform: scale(var(--cursor-scale));
    transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .cursor-ring {
    left: calc(var(--mouse-x) - 24px);
    top: calc(var(--mouse-y) - 24px);
    transform: scale(calc(var(--cursor-scale) * 0.8));
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .cursor-trail-1 {
    left: calc(var(--mouse-x) - 40px);
    top: calc(var(--mouse-y) - 40px);
    transform: scale(calc(var(--cursor-scale) * 0.6));
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .cursor-trail-2 {
    left: calc(var(--mouse-x) - 64px);
    top: calc(var(--mouse-y) - 64px);
    transform: scale(calc(var(--cursor-scale) * 0.4));
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .cursor-dot.clicking {
    animation: pulse-click 0.3s ease-out;
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
  }
  
  @keyframes pulse-click {
    0% { transform: scale(var(--cursor-scale)); }
    50% { transform: scale(calc(var(--cursor-scale) * 1.5)); }
    100% { transform: scale(var(--cursor-scale)); }
  }
`}</style>
      {/* Enhanced Custom Cursor - Hardware Accelerated */}
      <div className="cursor-dot fixed w-6 h-6 bg-green-400/90 rounded-full pointer-events-none z-50 mix-blend-difference" />
      <div className="cursor-ring fixed w-12 h-12 border-2 border-green-400/40 rounded-full pointer-events-none z-50" />

      {/* Cursor trails */}
      <div className="cursor-trail-1 fixed w-20 h-20 bg-gradient-radial from-green-400/20 to-transparent rounded-full pointer-events-none z-40" />
      <div className="cursor-trail-2 fixed w-32 h-32 bg-gradient-radial from-green-400/10 to-transparent rounded-full pointer-events-none z-30" />

      {/* Interactive background elements with smoother movement */}
      {isMounted && (
        <div className="absolute inset-0">
          <div
            className="absolute w-72 h-72 bg-green-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
            style={{
              left: mousePosition.x * 0.08,
              top: mousePosition.y * 0.08,
              transform: `scale(${isClicking ? 1.2 : 1})`,
            }}
          />
          <div
            className="absolute w-96 h-96 bg-green-400/5 rounded-full blur-3xl transition-all duration-1500 ease-out"
            style={{
              right: (window.innerWidth - mousePosition.x) * 0.03,
              bottom: (window.innerHeight - mousePosition.y) * 0.03,
              transform: `scale(${isClicking ? 1.3 : 1})`,
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl transition-all duration-2000 ease-out"
            style={{
              left: mousePosition.x * 0.015,
              top: mousePosition.y * 0.015,
              transform: `scale(${isClicking ? 1.1 : 1})`,
            }}
          />
        </div>
      )}

      {/* Interactive grid pattern overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:50px_50px] transition-all duration-1000"
        style={{
          backgroundPosition: isMounted ? `${mousePosition.x * 0.01}px ${mousePosition.y * 0.01}px` : '0px 0px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Smarter Solutions.{" "}
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent animate-pulse">
                Unlooped.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Unloop IT is launching soon — your trusted partner in navigating the complexities of AI, automation, and modern IT strategy. We help businesses unlock the full potential of AI with tailored, explainable, and scalable solutions.
            </p>
          </div>

          {/* Email signup with Brevo integration */}
          <div className="max-w-md mx-auto mt-12">
            <form action={formAction} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="bg-gray-900/50 border-green-500/30 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20 h-12 hover:bg-gray-800/50 transition-all duration-300"
                  required
                  disabled={isPending}
                />
              </div>
              <Button
                type="submit"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold h-12 px-6 group hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Notify Me
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Success/Error Messages */}
            {state && state.message && (
              <div
                className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                  state.success
                    ? "bg-green-500/10 border border-green-500/20 text-green-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
              >
                {state.success ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{state.message}</p>
              </div>
            )}

            <p className="text-sm text-gray-400 mt-3">Be the first to know when we launch. No spam, ever.</p>
          </div>

          {/* Social links */}
          <div className="flex justify-center space-x-6 pt-8">
            {[
              // { icon: Twitter, href: "#", label: "Twitter" },
              // { icon: Github, href: "#", label: "GitHub" },
              // { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "mailto:lets@unloop.it.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="w-12 h-12 bg-gray-900/50 border border-green-500/20 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/20"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-12 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Unloop IT Consultancy Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive floating particles */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse transition-all duration-1000"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
                transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
