import '../../../app/_css/Blog.css';
import Head from 'next/head';
import blogPosts from '../../../../blogPosts.json'
import BlogPostCard from '../../../app/_components/BlogPostCard';
import BlogNavBar from '../../../app/_components/BlogNavBar';
import BlogRssDial from '@/app/_components/BlogRssDial';

function Blog() {
    return (
        <div>
            <Head>
                <title>Blog</title>
                <meta name="theme-color" content="#0d0d0d" />
            </Head>
            <BlogNavBar />
            <div className="blogPosts">
                {blogPosts.map((post) => {
                    return (
                        <BlogPostCard {...post} key={post.id} />
                    );
                })}
            </div>
            <div className="bottomRight">
                <BlogRssDial />
            </div>
        </div>
    );
}

export default Blog;
