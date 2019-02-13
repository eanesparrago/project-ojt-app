export const ADD = "MAIN_DATA_POSTS_ADD";

export const add = payload => {
  console.log("test");
  return { type: ADD, payload };
};
