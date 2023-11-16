'use client'

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { FaRss, FaAtom } from "react-icons/fa6";
import { MdDataObject } from 'react-icons/md'

const actions = [
    { icon: <FaRss />, name: 'RSS' },
    { icon: <MdDataObject />, name: 'JSON' },
    { icon: <FaAtom />, name: 'Atom' }
];

export default function BlogRssDial() {
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
        <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<FaRss />}
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
    )
}