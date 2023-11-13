import '../css/Blog.css';
import { Helmet } from 'react-helmet';
import blogPosts from '../../blogPosts.json'
import BlogPostCard from "../components/BlogPostCard.tsx";
import { BlogNavBar } from "../components/BlogNavBar.tsx";
import { faRss, faAtom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DataObject from "@mui/icons-material/DataObject";

const actions = [
    { icon: <FontAwesomeIcon icon={faRss} />, name: 'RSS' },
    { icon: <DataObject />, name: 'JSON' },
    { icon: <FontAwesomeIcon icon={faAtom} />, name: 'Atom' }
];

function Blog() {
    const handleChange = (event: string) => {
        switch (event) {
            case 'RSS':
                window.location.href = '/blog/rss.xml'
                break;
            case 'JSON':
                window.location.href = '/blog/feed.json'
                break;
            case 'Atom':
                window.location.href = '/blog/atom.xml'
                break;
        }
    }
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
            <div className="bottomRight">
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<FontAwesomeIcon icon={faRss} />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => handleChange(action.name)}
                        />
                    ))}
                </SpeedDial>
            </div>
        </div>
    );
}

export default Blog;
