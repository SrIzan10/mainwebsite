import Link from "next/link";
import '../_css/ImageAuthor.css'
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ImageAuthor(props: Props) {
    return (
        <div className='imageAuthor'>
            <Link href={props.location}><p>{props.description}</p></Link>
            <p>by {props.author}</p>
            <Link href={props.url}><FaExternalLinkAlt /></Link>
        </div>
    )
}

type Props = {
    url: string;
    author: string;
    description: string;
    location: string;
}