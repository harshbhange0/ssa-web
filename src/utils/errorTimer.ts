const errorTimer = (
  error: React.Dispatch<React.SetStateAction<boolean>>,
  loading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  error(true);
  setTimeout(() => {
    error(false);
  }, 2000);
  if (loading) {
    loading(false);
  }
};

export default errorTimer;
