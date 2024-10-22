import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";
import MiniCard from '@/app/components/miniCardItems'


export default function mainCardGeneral({ data }) {
    const imageLinks = [
        "https://i.pinimg.com/564x/2e/85/ec/2e85ecb7ed70ca8de39484def02d0670.jpg",
        "https://i.pinimg.com/736x/b0/c7/9d/b0c79d908753bbad37a671b51b39ad74.jpg"
    ];
    return (
        <Card className={styles.topCard}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Top Three Items
                    </Typography>
                    {data.map((dataItem, index) => (
                        <MiniCard key={index} data={dataItem} url={imageLinks[index]} />
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

