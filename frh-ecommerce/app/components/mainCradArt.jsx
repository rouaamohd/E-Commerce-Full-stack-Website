import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";
import MiniCard from '@/app/components/miniCardArtiest'


export default function mainCardGeneral({ data }) {
    const imageLinks = [
        "https://i.pinimg.com/564x/91/10/ea/9110ea8ee4374256f01f6c913b3d488d.jpg",
        "https://i.pinimg.com/564x/c5/8d/56/c58d564df7784fd9a128c7a66a8d58ee.jpg",
        "https://i.pinimg.com/736x/94/7c/67/947c6747e30d281ee104a46fd574b7f7.jpg"
    ];
    return (
        <Card className={styles.topCard}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Top Three
                    </Typography>
                    {data.map((dataItem, index) => (
                        <MiniCard key={index} data={dataItem} url={imageLinks[index]} />
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

