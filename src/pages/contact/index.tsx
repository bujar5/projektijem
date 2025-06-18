'use client'
import React, { useState } from 'react'

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    })
    const [status, setStatus] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic validation
        if (!formData.firstName || !formData.email || !formData.message) {
            setStatus('Please fill in all required fields.')
            return
        }

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
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
            setStatus('Failed to send. Try again.')
        }
    }

    return (
        <div className='h-screen w-[80%] mx-auto flex flex-col items-center justify-center lg:gap-24 gap-16'>
            <div className='space-y-8 flex flex-col items-center'>
                <h1 className='text-5xl font-semibold'>Contact Us</h1>
                <p className='text-xl'>Let us know what’s on your mind!</p>
            </div>

            <div className="bg-[url('/wallpaper.jpg')] bg-cover bg-center h-[50vh] w-full flex rounded-xl p-2 gap-2 text-white">
                <div className='w-[40%] bg-white/25 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-lg aspect-square p-8 flex flex-col justify-between'>
                    <div>
                        <h2 className='font-semibold text-3xl'>Contact Information</h2>
                        <p className='text-xl'>Contact Us!</p>
                    </div>
                    <ul className='space-y-2'>
                        <li>+01123456789</li>
                        <li>hello@bujar.com</li>
                        <li>123 Street, Kosova</li>
                    </ul>
                    <ul className='flex gap-4'>
                        <li>FB</li>
                        <li>IG</li>
                        <li>TW</li>
                        <li>LI</li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit} className='w-[60%] space-y-8 p-8 flex flex-col justify-between'>
                    <div className='grid grid-cols-2 grid-rows-2 gap-8 [&>input]:border-b [&>input]:pb-2 [&>input]:focus:outline-none [&>input]:placeholder:text-sm'>
                        <input name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First Name *' />
                        <input name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last Name' />
                        <input name='email' value={formData.email} onChange={handleChange} placeholder='Email *' />
                        <input name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone' />
                    </div>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder='Message *' className='border-b outline-none w-full'></textarea>
                    <button type='submit' className='w-full border rounded-xl border-white text-white text-xl font-semibold text-center bg-transparent hover:bg-white hover:text-black transition mt-auto p-2 cursor-pointer'>SUBMIT</button>
                    {status && <p className='text-sm'>{status}</p>}
                </form>
            </div>
        </div>
    )
}

export default Contact
