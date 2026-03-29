import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react'
import { toast } from 'sonner'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'piyushmaurya132@gmail.com', href: 'mailto:piyushmaurya132@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9760576243', href: 'tel:+919760576243' },
    { icon: MapPin, label: 'Location', value: 'Chennai, India', href: '#' }
  ]

  const socials = [
    { icon: Github, href: 'https://github.com/sick232', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/piyush-maurya13', label: 'LinkedIn' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Form inputs stagger
      gsap.fromTo(formRef.current?.querySelectorAll('.form-field') || [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Info animation
      gsap.fromTo(infoRef.current?.children || [],
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Message sent successfully! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d3d8da]/5 to-[#161616] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#d3d8da]/50 mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-[#d3d8da] mb-6">
            LET&apos;S <span className="text-white">TALK</span>
          </h2>
          <p className="font-body text-base md:text-lg text-[#d3d8da]/60 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you. 
            Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="form-field">
              <label htmlFor="name" className="block font-body text-sm text-[#d3d8da]/60 mb-2">
                
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-0 py-4 bg-transparent border-b border-[#d3d8da]/20 text-[#d3d8da] font-body focus:outline-none focus:border-[#d3d8da] transition-colors placeholder:text-[#d3d8da]/30"
                placeholder="Your Name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block font-body text-sm text-[#d3d8da]/60 mb-2">
               
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-0 py-4 bg-transparent border-b border-[#d3d8da]/20 text-[#d3d8da] font-body focus:outline-none focus:border-[#d3d8da] transition-colors placeholder:text-[#d3d8da]/30"
                placeholder="Your Email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block font-body text-sm text-[#d3d8da]/60 mb-2">
                
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-0 py-4 bg-transparent border-b border-[#d3d8da]/20 text-[#d3d8da] font-body focus:outline-none focus:border-[#d3d8da] transition-colors resize-none placeholder:text-[#d3d8da]/30"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="liquid-fill group relative w-full md:w-auto px-10 py-5 border border-[#d3d8da] rounded-full font-body text-sm tracking-wider uppercase text-[#d3d8da] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-[#d3d8da]/30 border-t-[#d3d8da] rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="font-display text-xl font-semibold text-[#d3d8da] mb-6">
                Contact Information
              </h3>
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#d3d8da]/10 flex items-center justify-center group-hover:bg-[#d3d8da]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#d3d8da]" />
                    </div>
                    <div>
                      <span className="block font-body text-xs text-[#d3d8da]/50 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="block font-body text-base text-[#d3d8da] group-hover:text-white transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-[#d3d8da]/10">
              <h3 className="font-display text-xl font-semibold text-[#d3d8da] mb-6">
                Follow Me
              </h3>
              <div className="flex gap-4">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#d3d8da]/10 flex items-center justify-center hover:bg-[#d3d8da] hover:text-[#161616] transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-2xl bg-[#d3d8da]/5 border border-[#d3d8da]/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-body text-sm text-[#d3d8da]/60">Open to opportunities</span>
              </div>
              <p className="font-body text-sm text-[#d3d8da]/70">
                I&apos;m currently looking for internships and collaboration opportunities 
                in AI/ML and full-stack development. Let&apos;s discuss how we can work together.
              </p>
            </div>

            {/* Achievement Highlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d3d8da]/10 to-transparent border border-[#d3d8da]/10">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#d3d8da]/50 mb-2 block">
                Achievement
              </span>
              <h4 className="font-display text-lg font-semibold text-[#d3d8da]">
                Adobe India Hackathon Finalist
              </h4>
              <p className="font-body text-sm text-[#d3d8da]/60 mt-1">
                Showcasing innovation in AI applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
