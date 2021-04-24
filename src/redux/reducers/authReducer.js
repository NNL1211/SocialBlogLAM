const initialState = {
  blogs: {},
  loading: false,
  error: "",
  singleBlog: {},
  comment: {},
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LISTREVIEW_REQUEST_START":
    case "WRITECONTENT_REQUEST_START":
    case "BLOG_REQUEST_START":
    case "REGISTER_REQUEST_START":
    case "SINGLEBLOG_REQUEST_START":
      state.loading = true;
      break;
    case "BLOG_REQUEST_SUCCESS":
      state.blogs = payload;
      state.loading = false;
      break;
    case "SINGLEBLOG_REQUEST_SUCCESS":
      state.singleBlog = payload;
      state.loading = false;
      break;
    case "LISTREVIEW_REQUEST_SUCCESS":
      state.comment = payload;
      state.loading = false;
      break;
    case "WRITECONTENT_REQUEST_SUCCESS":
    case "REGISTER_REQUEST_SUCCESS":
      state.loading = false;
      console.log("success!!!");
      break;
    case "LISTREVIEW_REQUEST_FAIL":
    case "WRITECONTENT_REQUEST_FAIL":
    case "REGISTER_REQUEST_FAIL":
    case "BLOG_REQUEST_FAIL":
    case "SINGLEBLOG_REQUEST_FAIL":
      state.loading = false;
      state.error = payload;
      // set the error messange
      break;
  }
  return { ...state };
};

export default authReducer;
