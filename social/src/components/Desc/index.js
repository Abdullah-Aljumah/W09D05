import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const Desc = () => {
  let id = useParams().id;
  const state = useSelector((state) => {
    return state;
  });
  //   console.log(state);
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState([]);

  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getPostWithCommentsAndLikes/${id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    // console.log(res.data, "RES");

    let data0 = res.data[0];
    let data1 = res.data[1];
    let data2 = res.data[2];

    // console.log("DATA", data0._id);

    setLikes(data2.length);
    setComment(data1);
    setPost(data0);
  };
  useEffect(() => {
    getData();
  }, []);

  const likePost = async () => {
    //   console.log("HERE");
    //   console.log(post._id);
    //   console.log( `${process.env.REACT_APP_BASE_URL}/like/${state.signIn.user._id}/${post._id}`);
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/like/${state.signIn.user._id}/${post._id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    getData();
  };
  return (
    <div>
      {post && (
        <div>
          <img
            src={post.img}
            alt="post"
            style={{ width: "100%", height: "25rem" }}
          />
          <h2>{post.desc} </h2>
          <p>{post.time}</p>
        </div>
      )}
      <hr />
      <button onClick={likePost}>Like</button>
      <p>{likes}</p>
      <h1>Comments</h1>
      {comment && (
        <div>
          {comment.map((item, i) => {
            return (
              <div key={i}>
                <p>@{item.user.username}</p>
                <p>{item.desc}</p>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Desc;
