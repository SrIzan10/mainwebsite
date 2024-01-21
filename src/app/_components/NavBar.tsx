// sadge
'use client';

import { useEffect, useState } from 'react';
import '../_css/BlogNavBar.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavBar(props: Props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [title, setTitle] = useState(props.title || 'Unnamed page');
    const router = useRouter()

    useEffect(() => {
        if (props.isBlog) {
            setTitle('Blog');
        }
        let prevScrollpos = window.scrollY;

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setIsScrolled(prevScrollpos < currentScrollPos);
            prevScrollpos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={`navBar ${isScrolled ? 'hide' : ''}`}>
            <div className="iconContainer">
                <img src="/pfp.webp" alt="main profile picture" height="50vh" />
                <p>{title}</p>
            </div>
            <Link href='#' onClick={() => router.back()} className="backHomeLink">Go back</Link>
        </div>
    )
}

type Props = { title?: string, isBlog?: boolean }