"use client"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import '../_css/BlogPostCard.css'
import { Button, CardActions } from "@mui/material";
import Link from "next/link";
dayjs.extend(customParseFormat)

export default function BlogPostCard(props: Props) {
    return (
        <Card>
            <Box className={'cardBox'}>
                <CardContent>
                    <Typography variant="h5">
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {dayjs(props.date, 'DD/MM/YYYY').toDate().toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions className={'actions'}>
                    <Link href={`/blog/${props.id}`}><Button size="small">Read</Button></Link>
                </CardActions>
            </Box>
        </Card>
    );
}

type Props = { title: string, description: string, date: string, id: number }