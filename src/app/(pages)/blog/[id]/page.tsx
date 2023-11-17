import Head from "next/head";
import * as fs from 'node:fs/promises'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import BlogNavBar from "../../../_components/BlogNavBar";
import '../../../_css/BlogPost.css';
import React from "react";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
    const jsonDataArray: BlogPostJSONResponse[] = JSON.parse(await (await fetch('blogPosts.json')).json())
    const id = parseInt(params.id);
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
        // redirect
    }
    return (
        <div>
            <Head>
                <title>{jsonData.title}</title>
                <meta name="description" content={jsonData.description} />
                <meta name="og:title" content={jsonData.title} />
                <meta name="og:description" content={jsonData.description} />
                <meta name="og:type" content="article" />
                <meta name="og:url" content={`https://srizan.dev/blog/${jsonData.id}`} />
                <meta name="og:article:author" content="Sr Izan" />
            </Head>
            <BlogNavBar title={jsonData.title} />
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

type BlogPostJSONResponse = {
    id: number;
    title: string;
    description: string;
    date: string;
    fileName: string;
    fileContent: string;
}
