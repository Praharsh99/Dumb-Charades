export const addNewGameHistory = (prevGames, newGame) => {
  const newArr = [...prevGames, newGame];

  return newArr;
};
