import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogNavBar } from "./BlogNavBar.tsx";
import './BlogPost.css';

export function BlogPost() {
    const id = Number(useParams().id);

    if (isNaN(id)) {
        // if it's not a number, redirect to the blog page
        window.location.href = '/blog';
    }

    const [jsonData, setJsonData] = useState<BlogPostJSONResponse>({
        id: 0,
        title: '',
        description: '',
        date: '',
        fileName: '',
        fileContent: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const jsonFetch = await import('../blogPosts.json');
            const jsonDataArray = jsonFetch.default;
            const filteredPost = jsonDataArray.filter((post) => post.id === id)[0];
            if (filteredPost) {
                setJsonData(filteredPost);
            } else {
                document.location.href = '/blog';
            }
        };

        fetchData();
    }, [id]);
    return (
        <div>
            <Helmet>
                <title>{jsonData.title} | Sr Izan's Blog</title>
            </Helmet>
            <BlogNavBar title={jsonData.title} />
            <div className={'blogPostContent'}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {jsonData.fileContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}

type BlogPostJSONResponse = {
    id: number;
    title: string;
    description: string;
    date: string;
    fileName: string;
    fileContent: string;
}
