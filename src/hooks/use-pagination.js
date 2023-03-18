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
  const startingIndex = page === 1 ? 0 : page * 6 - 6;
  const endingIndex = page === 1 ? 6 : page * 6;
  return [
    page,
    startingIndex,
    endingIndex,
    pageIncreaseHandler,
    pageDecreaseHandler,
  ];
};
export default usePagination;
