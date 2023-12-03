import Link from "next/link";
import '../_css/ImageAuthor.css'
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ImageAuthor(props: Props) {
    return (
        <div className='imageAuthor'>
            <Link href={props.location} target="_blank"><p>{props.description}</p></Link>
            <p>by {props.author}</p>
            <Link href={props.url} target="_blank"><FaExternalLinkAlt /></Link>
        </div>
    )
}

type Props = {
    url: string;
    author: string;
    description: string;
    location: string;
}