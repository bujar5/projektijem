import React from 'react'

const Contact = () => {
    return (
        <div className='h-screen w-[80%] mx-auto flex flex-col items-center justify-center lg:gap-24 gap-16'>
            <div className='space-y-8 flex flex-col items-center'>
                <h1 className='text-5xl font-semibold'>Contact Us</h1>
                <p className='text-xl'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, itaque.</p>
            </div>
            <div className="bg-[url('/wallpaper.jpg')] bg-cover bg-center h-[50vh] w-full flex rounded-xl p-2 gap-2 text-white">
                <div className='w-[40%] bg-white/25 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-lg aspect-square p-8 flex flex-col justify-between'>
                    <div>
                        <h2 className='font-semibold text-3xl'>Contact Information</h2>
                        <p className='text-xl'>Lorem ipsum dolor sit amet consectetur.</p>
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
                <form action="" className='w-[60%] space-y-8 p-8 flex flex-col justify-between'>
                    <div className='grid grid-cols-2 grid-rows-2 gap-8 [&>input]:border-b [&>input]:pb-2 [&>input]:focus:outline-none [&>input]:placeholder:text-sm'>
                        <input type="text" placeholder='First Name' />
                        <input type="text" placeholder='Last Name' />
                        <input type="text" placeholder='Mail' />
                        <input type="text" placeholder='Phone' />
                    </div>
                    <textarea name="message" id="" placeholder='Message' className='border-b outline-none w-full'></textarea>
                    <button className='w-full border rounded-xl border-white text-white text-xl font-semibold text-center bg-transparent hover:bg-white hover:text-black transition mt-auto p-2 cursor-pointer'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default Contact