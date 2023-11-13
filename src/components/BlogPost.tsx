import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
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
            const jsonFetch = await import('../../blogPosts.json');
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
                <title>{jsonData.title}</title>
                <meta name="description" content={jsonData.description} />
                <meta name="og:title" content={jsonData.title} />
                <meta name="og:description" content={jsonData.description} />
                <meta name="og:type" content="article" />
                <meta name="og:url" content={`https://srizan.dev/blog/${jsonData.id}`} />
                <meta name="og:article:author" content="Sr Izan" />
            </Helmet>
            <BlogNavBar title={jsonData.title} />
            <div className={'blogPostContent'}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                    code(props) {
                        const { children, className, ...rest } = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                            <SyntaxHighlighter
                                {...rest}
                                style={atomDark}
                                customStyle={{ backgroundColor: '#171717', outline: 'solid' }}
                                codeTagProps={{ className: 'codeHighlighter' }}
                                language={match[1]}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                            />
                        ) : (
                            <code className={className} {...props} style={{
                                fontSize: '1rem',
                                backgroundColor: '#171717',
                                outline: '3px solid #171717'
                            }}>
                                {children}
                            </code>
                        )
                    },
                    img(props) {
                        return <img {...props} style={{ maxWidth: '100%' }} />
                    }
                }}>
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
