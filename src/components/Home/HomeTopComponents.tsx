import { Box, Button } from "@material-ui/core";
import Select from "components/shared/Select/Select";
import { IFacet } from "interface/general";
import { FC } from "react";
const usersId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface IHomeTopComponentsProps {
  facet: IFacet;
  handleFilter: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
  handleCreate: VoidFunction;
}

const HomeTopComponents: FC<IHomeTopComponentsProps> = (props) => {
  const { facet, handleFilter, handleCreate } = props;
  return (
    <Box width="100%" display="flex" justifyContent="space-between">
      <Select
        list={usersId}
        label="Filter bu user's id:"
        onChange={handleFilter}
        value={facet.userId ?? 0}
      />
      <Button onClick={handleCreate} color="primary" variant="contained">
        Create a post
      </Button>
    </Box>
  );
};

export default HomeTopComponents;
