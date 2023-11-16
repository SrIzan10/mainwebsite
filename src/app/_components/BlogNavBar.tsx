// sadge
'use client';

import { useEffect, useState } from 'react';
import '../_css/BlogNavBar.css'
import Link from 'next/link';

export default function BlogNavBar(props: Props) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
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
    }, []);
    return (
        <div className={`navBar ${isScrolled ? 'hide' : ''}`}>
            <div className="iconContainer">
                <img src="/pfp.webp" alt="main profile picture" height="50vh" />
                <p>{props.title || 'Sr Izan\'s blog'}</p>
            </div>
            <Link href={props.title ? '/blog' : '/'} className="backHomeLink">Go back {props.title ? 'to posts' : 'home'}</Link>
        </div>
    )
}

type Props = { title?: string }