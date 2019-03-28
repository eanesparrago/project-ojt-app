export default clocks => {
  if (clocks.length === 0) {
    return null;
  }

  return clocks[clocks.length - 1].in;
};
