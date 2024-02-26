import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BackProps {
    href: string;
    label: string;
}

const BackButton = ({href, label}: BackProps) => {
  return (
    <Button variant='link' className='w-full' size='sm' asChild>
        <Link href={href}>
            {label}
        </Link>
    </Button>
  )
}

export default BackButton
