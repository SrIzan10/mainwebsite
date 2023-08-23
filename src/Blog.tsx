// Blog.js
import './Blog.css';
import { Helmet } from 'react-helmet';
import blogPosts from '../blogPosts.json'
import BlogPostCard from "./BlogPostCard.tsx";
import {BlogNavBar} from "./BlogNavBar.tsx";

function Blog() {
    return (
        <div>
            <Helmet>
                <title>Blog | Sr Izan's website</title>
                <meta name="theme-color" content="#0d0d0d" />
            </Helmet>
            <BlogNavBar />
            <div className="blogPosts">
                {blogPosts.map((post) => {
                    return (
                        <BlogPostCard {...post} />
                    );
                })}
            </div>
        </div>
    );
}

export default Blog;
