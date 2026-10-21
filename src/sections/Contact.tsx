import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Send, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'
import { profile } from '../data/profile'

// ENV VARIABLES
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const contactInfo = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Location', value: profile.location }
]

const socials = [
  { icon: Linkedin, href: profile.linkedinUrl, label: 'LinkedIn' },
  { icon: Github, href: profile.githubUrl, label: 'GitHub' }
]

const inputClass =
  'w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-base text-zinc-100 placeholder:text-zinc-600 sm:text-sm transition-colors focus:border-brand/60 focus:outline-none focus:ring-0'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // SEND EMAIL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString()
        },
        PUBLIC_KEY
      )

      toast.success("Message sent — I'll get back to you soon.")

      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error(error)
      toast.error(`Failed to send. Please email me directly at ${profile.email}.`)
    }

    setIsSubmitting(false)
  }

  // HANDLE INPUT CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(122,162,255,0.1),transparent)]" />

      <div className="container-custom relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Intro + info */}
          <div>
            <span className="eyebrow slide-in">Contact</span>
            <h2 className="slide-in mt-5 font-display text-4xl font-bold text-white md:text-5xl">
              Let&apos;s build something together.
            </h2>
            <p className="slide-in mt-5 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
              I&apos;m currently looking for opportunities in AI, software engineering and full-stack
              development. Whether you have a role, a project or just want to connect — my inbox is
              open.
            </p>

            <div className="slide-in mt-10 space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-colors group-hover:text-brand">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                        {label}
                      </span>
                      <span className="block truncate text-sm text-zinc-200 transition-colors group-hover:text-white">
                        {value}
                      </span>
                    </div>
                  </>
                )

                return href ? (
                  <a key={label} href={href} className="group flex items-center gap-4">
                    {content}
                  </a>
                ) : (
                  <div key={label} className="group flex items-center gap-4">
                    {content}
                  </div>
                )
              })}
            </div>

            <div className="slide-in mt-10 flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !px-4 !py-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-surface slide-in space-y-5 p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-zinc-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-zinc-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about the role or project..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary group w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
