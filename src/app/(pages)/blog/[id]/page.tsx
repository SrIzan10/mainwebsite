import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import BlogNavBar from "../../../_components/NavBar";
import '../../../_css/BlogPost.css';
import React from "react";
import jsonDataArray from '../../../../../public/blogPosts.json';
import { redirect } from "next/navigation";
import { Metadata } from 'next';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)

export default async function Page({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (Number.isNaN(id)) redirect('/blog')
    let jsonData = {
        id: 0,
        title: '',
        description: '',
        date: '',
        fileName: '',
        fileContent: ''
    }

    const filteredPost = jsonDataArray.filter((post) => post.id === id)[0];
    if (filteredPost) {
        jsonData = filteredPost;
    } else {
        redirect('/blog')
    }
    return (
        <div>
            <BlogNavBar title={jsonData.title} isBlog />
            <div className={'blogPostContent'}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                    code({node, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                            <SyntaxHighlighter
                                style={atomDark}
                                customStyle={{ backgroundColor: '#171717', outline: 'solid' }}
                                codeTagProps={{ className: 'codeHighlighter' }}
                                language={match[1]}
                                // eslint-disable-next-line react/no-children-prop
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
                        // eslint-disable-next-line jsx-a11y/alt-text
                        return <img {...props} style={{ maxWidth: '100%' }} />
                    }
                }}>
                    {jsonData.fileContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = parseInt(params.id);
    if (Number.isNaN(id)) redirect('/blog')
    let jsonData = {
        id: 0,
        title: '',
        description: '',
        date: '',
        fileName: '',
        fileContent: ''
    }

    const filteredPost = jsonDataArray.filter((post) => post.id === id)[0];
    if (!filteredPost) redirect('/blog')
    jsonData = filteredPost;

    return {
        title: jsonData.title,
        description: jsonData.description,
        openGraph: {
            title: jsonData.title,
            description: jsonData.description,
            authors: ['Sr Izan'],
            type: 'article',
            url: `https://srizan.dev/blog/${id}`,
            publishedTime: dayjs(jsonData.date, 'DD/MM/YYYY').toISOString(),
            siteName: 'Sr Izan\'s blog',
        }
    }
}

type BlogPostJSONResponse = {
    id: number;
    title: string;
    description: string;
    date: string;
    fileName: string;
    fileContent: string;
}