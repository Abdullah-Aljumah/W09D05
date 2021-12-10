import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Desc = () => {
  let id = useParams().id;
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  //
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState([]);

  // Get post with comments and likes
  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getPostWithCommentsAndLikes/${id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );

    let data0 = res.data[0];
    let data1 = res.data[1];
    let data2 = res.data[2];


    // Set the data into the variables
    setLikes(data2.length);
    setComment(data1);
    setPost(data0);
  };

  // Invoke get data function
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  // Button like
  const likePost = async () => {
    // eslint-disable-next-line
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/like/${state.signIn.user._id}/${post._id}`
    );
    getData();
  };

  // Create new commnet
  const newComment = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newComment/${state.signIn.user._id}/${post._id}`,
      {
        desc: e.target[0].value,
      },
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    e.target[0].value = "";
    getData();
  };


  // Delte comment
  const deleteComment = async (id) => {
    // eslint-disable-next-line
    let res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deletecomment/${id}`,

      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    getData();
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Go back</button>
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
      <form onSubmit={newComment}>
        <input type="text" name="Newcomment" placeholder=" New omment" />
        <input type="submit" value="Post" style={{ cursor: "pointer" }} />
      </form>
      {comment && (
        <div>
          {comment.map((item, i) => {
            return (
              <div key={i}>
                <p>@{item.user.username}</p>
                <p>{item.desc}</p>
                {state.signIn.user.role === "61a734cd947e8eba47efbc68" ||
                state.signIn.user._id === item.user._id ||
                state.signIn.user._id === post.user ? (
                  <button onClick={() => deleteComment(item._id)}>
                    Delete
                  </button>
                ) : (
                  <p></p>
                )}
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
