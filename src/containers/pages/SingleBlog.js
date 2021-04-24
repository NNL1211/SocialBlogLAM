import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { authActions } from '../../redux/actions/auth.action'
import { Form, Button } from "react-bootstrap";

const SingleBlog = () => {
    const [update,Setupdate] = useState({})
    const checklogin = localStorage.getItem("accessToken")
    const [content,setContent]=useState({
        content: "",
    })
    const {id}=useParams()
    const dispatch= useDispatch()
    const handleChange = (e) => {
        setContent( {...content,[e.target.name]:e.target.value} )
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(authActions.writeReview({content},id))
        dispatch(authActions.getSingleBlog(id))
        Setupdate({...content})
        e.target.reset()
      }

    const SingleBlog= useSelector((state)=> state.auth.singleBlog.data)
    console.log("this is single blog",SingleBlog)
    const listReview= useSelector((state)=>state.auth.comment.data)
    const ContentReview= useSelector((state)=>state.auth.singleBlog.data)
    console.log("this is content review",ContentReview)
    useEffect(()=>{
        dispatch(authActions.getSingleBlog(id))
        dispatch(authActions.getListReview(id))
    },[update])
    return (
        <div>
            <h3>{SingleBlog && SingleBlog.data.title}</h3>
            <hr/>
            <div>@{SingleBlog && SingleBlog.data.author.name} wrote {moment(SingleBlog && SingleBlog.data.author.createdAt).fromNow()}</div>
            <div>{SingleBlog && SingleBlog.data.content}</div>
            <hr/>
            <div>{ContentReview && ContentReview.data.reviews.map((review,index)=>{
                return( <div key={index}>{review.content}<br/>
                        posted by {review.user.name} on {moment(review.createdAt).fromNow()}
                        <hr/>  
                        </div> 
                             
                        )
            })}</div>            
            {checklogin ? (<Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Review</Form.Label>
                <Form.Control onChange={handleChange} type="text" placeholder="Your comment" name="content"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                 Submit
                </Button>
             </Form>):null}
        </div>
    )
}

export default SingleBlog
