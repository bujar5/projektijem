'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const [status, setStatus] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus('Please fill in all required fields.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('Message sent successfully!')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        })
      } else {
        const errorData = await res.json()
        setStatus(`Failed to send: ${errorData.message || res.statusText}. Try again.`)
      }
    } catch (error) {
      console.error('Error sending contact form:', error)
      setStatus('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className='pt-20 min-h-screen bg-[#121212] flex flex-col items-center text-white'>
      <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-10'>
        <motion.div
          className='space-y-8 flex flex-col items-center text-center mb-12'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-5xl lg:text-6xl font-extrabold text-[#FFD700] leading-tight mb-4 tracking-tight uppercase'>
            Contact Us
          </h1>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
            Let us know what’s on your mind! We are here to help and answer any question you might have.
          </p>
        </motion.div>

        <div className="bg-[#1f1f1f] rounded-xl shadow-lg border border-[#FFD700]/20 w-full flex flex-col lg:flex-row p-4 lg:p-8 gap-4 lg:gap-8">
          {/* Contact Info */}
          <motion.div
            className='lg:w-2/5 bg-[#2c2c2c] p-6 sm:p-8 rounded-lg flex flex-col justify-between shadow-inner border border-[#FFD700]/10'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className='font-semibold text-3xl text-[#FFD700] mb-2'>Contact Information</h2>
              <p className='text-gray-300 text-lg'>Feel free to reach out to us through any of these channels.</p>
            </div>
            <ul className='space-y-4 text-gray-300 text-lg mt-8'>
              <li className="flex items-center gap-3">📞 +01123456789</li>
              <li className="flex items-center gap-3">✉️ hello@bujar.com</li>
              <li className="flex items-center gap-3">📍 123 Street, Kosova</li>
            </ul>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className='lg:w-3/5 space-y-6 p-6 sm:p-8 flex flex-col justify-between bg-[#1f1f1f] rounded-lg'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <input
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='First Name *'
                className='bg-[#2c2c2c] text-white border border-gray-600 focus:border-[#FFD700] rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none transition'
              />
              <input
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Last Name'
                className='bg-[#2c2c2c] text-white border border-gray-600 focus:border-[#FFD700] rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none transition'
              />
              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email *'
                type="email"
                className='bg-[#2c2c2c] text-white border border-gray-600 focus:border-[#FFD700] rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none transition'
              />
              <input
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='Phone'
                type="tel"
                className='bg-[#2c2c2c] text-white border border-gray-600 focus:border-[#FFD700] rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none transition'
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder='Message *'
              rows={6}
              className='bg-[#2c2c2c] text-white border border-gray-600 focus:border-[#FFD700] rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none transition resize-y'
            ></textarea>

            <button
              type='submit'
              className='w-full px-6 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300 ease-in-out shadow-md uppercase tracking-wider text-lg'
            >
              SUBMIT
            </button>

            {/* ✅ Status Message Display */}
            {status && (
              <p className={`mt-4 text-center text-sm font-semibold ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                {status}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  )
}

export default Contact
