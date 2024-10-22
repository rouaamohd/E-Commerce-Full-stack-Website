import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";
import MiniCard from '@/app/components/miniCardCategory';

export default function mainCardGeneral({ data }) {
    const imageLinks = [
        "https://i.pinimg.com/564x/e7/e5/b1/e7e5b127a34f0ae33d78a1f38e9e8f61.jpg",
        "https://i.pinimg.com/564x/11/2e/b2/112eb2e3b85547fa1befa01195d12e54.jpg",
        "https://i.pinimg.com/564x/42/68/8b/42688bcdb21df9476da69a4c9c9a92de.jpg"
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
