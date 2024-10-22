import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function MiniCardCategory({ data, url }) {
    return (
        <Card className={styles.miniCard}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={url} 
                    alt="Top Artist cards"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Name: {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Username: {data.username}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
