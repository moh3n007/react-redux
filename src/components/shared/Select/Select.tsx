import {
  Box,
  MenuItem,
  Select as MiuSelect,
  SelectProps,
  Typography,
} from "@material-ui/core";
import { FC } from "react";

type ISelectProps = {
  list: number[];
  label: string;
} & SelectProps;

const Select: FC<ISelectProps> = (props) => {
  const { list, label, ...rest } = props;
  return (
    <Box display="flex" alignItems="center">
      <Box mr={2}>
        <Typography>{label}</Typography>
      </Box>
      <MiuSelect
        {...rest}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        variant="outlined"
      >
        {list.map((item) => (
          <MenuItem key={`${rest?.id}-${item}`} value={item}>
            {item}
          </MenuItem>
        ))}
      </MiuSelect>
    </Box>
  );
};

export default Select;
