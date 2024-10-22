import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function MiniCardItems({ data, url }) {
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
            Title: {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Id: {data.id}
            {/* Description: {data.description} */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available Quantity: {data.available_quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
