
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../index.css'
import present from'../images/present.jpg'
import sailing from '../images/sailing.jpg'
import saving from '../images/saving.jpg'
import stealing from '../images/stealing.jpg'



const GroupCard = ({ association }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        let imageSource;
        switch (association.associationid) {
          case '1':
            imageSource = sailing;
            break;
          case '2':
            imageSource = present;
            break;
          case '3':
            imageSource = saving;
            break;
          case '9':
            imageSource = stealing;
            break;
          default:
            imageSource = saving;
            break;
        }
        setImage(imageSource);
      } catch (error) {
        console.error('Error loading image:', error.message);
      }
    };

    loadImage();
  }, [association.associationid]);
  return(
    <Card sx={{ width: 270, height: '100%' }} className="group-card">
    <CardActionArea component={Link} to={`/groups/${association.associationid}`}>
    {image && (
          <CardMedia component="img" src={image} alt={association.name} height="140" />
        )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {association.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {association.description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
}
export default GroupCard;
