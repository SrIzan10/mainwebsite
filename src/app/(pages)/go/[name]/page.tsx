import NavBar from "@/app/_components/NavBar";
import { get } from '@vercel/edge-config';
import Link from "next/link";
import { redirect } from "next/navigation";
import '../../../_css/LinkShortenerVerification.css';
import { Metadata } from 'next';

export default async function Page({ params }: { params: { name: string } }) {
    const getLink = await get(params.name) as string | undefined;
    if (!getLink) {
        redirect('../notfound')
    }
    const url = new URL(getLink);
    return (
        <div>
            <NavBar title={'Link shortener'} />
            <div className="navbarMargin center">
                <h3>This link sends you to {url.hostname}</h3>
                <Link href={url.toString()}>Go there I don't care</Link>
            </div>
        </div>
    )
}

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
    return {
        title: `Link shortener ID ${params.name}`
    }
}