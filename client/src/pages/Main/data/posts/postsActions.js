export const MAIN_DATA_POSTS_ADD = "MAIN_DATA_POSTS_ADD";

export const add = payload => {
  console.log("test");
  return { type: MAIN_DATA_POSTS_ADD, payload };
};
