import { Box, Typography } from "@material-ui/core";
import GallerySearchInput from "components/Gallery/GallerySearchInput";
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
      <Box my={3}>
        <GallerySearchInput
          handleSearch={(e) => {
            e.preventDefault();
            getGallery((e.target as any)?.[0].value);
          }}
        />
      </Box>
      {loading ? (
        <Loading />
      ) : !!gallery.length ? (
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
      ) : (
        <Typography>There is no image</Typography>
      )}
    </Box>
  );
};

export default Gallery;
