export const categories = async () => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data;
};
