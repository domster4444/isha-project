import React from "react";

export const useFilter = (filter) => {
  const [filterValue, setFilterValue] = React.useState(filter);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  return {
    filterValue,
    handleFilterChange,
  };
};
