import { IImage } from "interface/gallery";
import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { Avatar, CardHeader } from "@material-ui/core";

interface IImageItemProps {
  image: IImage;
}

const ImageItem: FC<IImageItemProps> = ({ image }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={image.user.profile_image.small}>
            {image.user.first_name}
          </Avatar>
        }
        title={image.user.first_name}
      />
      <CardMedia className={classes.media} image={image.urls.small} />
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default ImageItem;
