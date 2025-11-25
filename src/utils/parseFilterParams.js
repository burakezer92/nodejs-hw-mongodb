export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  return {
    type: type,
    isFavourite: isFavourite,
  };
};
