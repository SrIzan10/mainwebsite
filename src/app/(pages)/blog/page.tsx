import '../../../app/_css/Blog.css';
import blogPosts from '../../../../public/blogPosts.json'
import BlogPostCard from '../../../app/_components/BlogPostCard';
import BlogNavBar from '../../_components/NavBar';
import BlogRssDial from '@/app/_components/BlogRssDial';

function Blog() {
    return (
        <div>
            <BlogNavBar isBlog />
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
