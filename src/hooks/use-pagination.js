import { useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(1);
  const pageIncreaseHandler = () => {
    setPage((page) => ++page);
  };
  const pageDecreaseHandler = () => {
    setPage((page) => --page);
  };
  // It is just to adjust page number and data selection
  const endingIndex = page === 1 ? page * 5 : page * 5 + 1;
  const startingIndex = page === 1 ? page * 5 - 5 : page * 5 - 4;
  return [
    page,
    startingIndex,
    endingIndex,
    pageIncreaseHandler,
    pageDecreaseHandler,
  ];
};
export default usePagination;
