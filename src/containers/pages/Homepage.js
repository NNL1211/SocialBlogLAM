import React from "react";
import { useSelector,useDispatch } from "react-redux";
import {useHistory,Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import {useEffect} from 'react'
import { authActions } from "../../redux/actions/auth.action";

const Homepage = () => {
  const checklogin = localStorage.getItem("accessToken")
  let dispatch = useDispatch();
  let history = useHistory();
  const data = useSelector((state) => state);
  let blogList = data.auth.blogs.data
  console.log(blogList)
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(authActions.getBlog());
  }, []);
  return (
    <div>
      {checklogin? <p>logined</p>:null}
      <div className="home">
      <div className="hearder-home">
        <h2>CoderSchool</h2>
        <div>
          <a href="#">Register</a>
          <a href="#">Login</a>
        </div>
      </div>
      <div className="social-blogs">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
      </div>
      <div className="content-home">
        {blogList &&
          blogList.data.blogs.map((item,index) => {
            return (
              <Link to={`/blogs/${item._id}`} key={index}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="holder.js/100px180"
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.content}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              </Link>
              
            )
          })}
      </div>
    </div>
    </div>
  )
};

export default Homepage;
