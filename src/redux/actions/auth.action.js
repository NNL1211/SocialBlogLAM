import api from "../api";
import { routeActions } from "./route.action";

const registerUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST_START", payload: null });
    const res = await api.post("/users", data);
    dispatch(routeActions.redirect("/login"));
    dispatch({ type: "REGISTER_REQUEST_SUCCESS", payload: null });
  } catch (err) {
    dispatch({ type: "REGISTER_REQUEST_FAIL", payload: null });
    console.log(err.message);
  }
};

const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST_START", payload: null });
    const res = await api.post("/auth/login", data);
    console.log("this is token",res.data.data.accessToken)
    localStorage.setItem("accessToken",res.data.data.accessToken)
    dispatch(routeActions.redirect("/"));

    dispatch({ type: "LOGIN_REQUEST_SUCCESS", payload: null });
  } catch (err) {
    dispatch({ type: "LOGIN_REQUEST_FAIL", payload: null });
    console.log(err.message);
  }
};

const getBlog = () => async (dispatch) => {
  try {
    dispatch({ type: "BLOG_REQUEST_START" });
    const res = await api.get("/blogs?page=1&limit=10");
    console.log("get data done");
    dispatch({ type: "BLOG_REQUEST_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "BLOG_REQUEST_FAIL", payload: error.message });
  }
}

const getSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SINGLEBLOG_REQUEST_START" })
    const res = await api.get(`/blogs/${id}`)
    console.log("get data done")
    dispatch({ type: "SINGLEBLOG_REQUEST_SUCCESS", payload: res })
    
  } catch (error) {
    dispatch({ type: "SINGLEBLOG_REQUEST_FAIL", payload: error.message })
  }
}

const writeReview = ({content},id)=> async (dispatch)=>{
  try {
    dispatch({ type: "WRITECONTENT_REQUEST_START", payload: null });
    const res = await api.post(`/reviews/blogs/${id}`,content);
    dispatch({ type: "WRITECONTENT_REQUEST_SUCCESS", payload: null});
  } catch (error) {
    dispatch({ type: "WRITECONTENT_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
}
const getListReview = (id) => async (dispatch) =>{
  try {
    dispatch({ type: "LISTREVIEW_REQUEST_START", payload: null });
    const reslist = await api.get(`/reviews/blogs/${id}`)
    dispatch({ type: "LISTREVIEW_REQUEST_SUCCESS", payload: reslist});
  } catch (error) {
    dispatch({ type: "LISTREVIEW_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
}
export const authActions = { registerUser,loginUser, getBlog,getSingleBlog,writeReview,getListReview};
