import './BlogNavBar.css'

export function BlogNavBar(props: Props) {
    return (
        <div className={'navBar'}>
            <div className="iconContainer">
                <img src="https://github.com/SrIzan10.png" alt="main profile picture" height="50vh" />
                <p>{props.title ? props.title : 'Sr Izan\'s blog'}</p>
            </div>
            <a href={'/'} className="backHomeLink">Go back home</a>
        </div>
    )
}

type Props = { title?: string }