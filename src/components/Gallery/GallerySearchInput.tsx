import { Box, Button, TextField } from "@material-ui/core";
import { FC } from "react";

interface IGallerySearchInputProps {
  handleSearch: (e: React.FormEvent<HTMLElement>) => void;
}

const GallerySearchInput: FC<IGallerySearchInputProps> = ({ handleSearch }) => {
  return (
    <Box component="form" onSubmit={handleSearch}>
      <Box display="flex" alignItems="center" gridGap="16px">
        <TextField placeholder="search an image" variant="outlined" />
        <Button color="primary" variant="contained" type="submit">
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default GallerySearchInput
