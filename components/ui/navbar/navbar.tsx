import React from 'react'
import Link from 'next/link'
import NavButtons from './nav-buttons'
import MaxWidthWrapper from '@/components/max_width_wrapper'


const Navbar = () => {
    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link
                        href='/'
                        className='flex text-xl md:text-2xl lg:text-3xl z-40 font-semibold'>
                        <span>TaskTale</span>
                    </Link>

                    {/* TODO: add a mobile navbar */}
                    <NavButtons />

                </div> 
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar
