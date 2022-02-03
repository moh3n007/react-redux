import { Box, Button, TextField, Typography } from "@material-ui/core";
import ImageItem from "components/Gallery/ImageItem";
import Loading from "components/shared/Loading/Loading";
import { galleryData } from "interface/gallery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import { State } from "state/reducers";

const Gallery = () => {
  const dispatch = useDispatch();
  const { getGallery } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    getGallery();
  }, []);
  const { loading, gallery, error } = useSelector(
    (state: State) => state.gallery as galleryData
  );

  if (error) return <span>Error in getting gallery</span>;

  return (
    <Box p={3}>
      <Typography variant="h4">Gallery</Typography>
      <Box
        my={3}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          getGallery("london");
          getGallery((e.target as any)?.[0].value);
        }}
      >
        <Box display="flex" alignItems="center" gridGap="16px">
          <TextField placeholder="search an image" variant="outlined" />
          <Button color="primary" variant="contained" type="submit">
            Search
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <Box
          mt={3}
          gridGap="16px"
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
        >
          {gallery.map((image) => (
            <ImageItem key={`gallery-img-${image.id}`} image={image} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Gallery;
