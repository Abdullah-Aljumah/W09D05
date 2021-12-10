import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import NewPost from "../NewPost";
import UpdatePost from "../UpdatePost";
import "./style.css";
const Home = () => {
  const state = useSelector((state) => {
    return state;
  });

  //
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(false);
  const navigate = useNavigate();
  // Get all posts
  const getPost = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/allpost`);
    setPosts(res.data);
  };

  // Inboke getPost function
  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  // Log out
  const logOut = () => {
    localStorage.clear();
  };

  // Delete post
  const deletePost = async (id) => {
    console.log(id, "IDDD");
    // eslint-disable-next-line
    let res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/softDelete/${id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    getPost();
  };

  // Update post

  const descPage = (id) => {
    navigate(`/${id}`);
  };

  const toggleNewPost = () => {
    setPost(!post);
  };

  return (
    <div>
      <div className="divNewAndLog">
        <button onClick={() => toggleNewPost()} className="btnNewAndLog" id="btnNew">New post</button>
        {post ? <NewPost setPost={setPost} getPost={getPost} /> : <p></p>}
        <form onClick={logOut}>
          <button type="submit" style={{ cursor: "pointer" }} className="btnNewAndLog" id="btnLog">
            {" "}
            Log out{" "}
          </button>
        </form>
      </div>
      <hr/>
      <div className="container">
        {posts &&
          posts.map((item, i) => {
            return (
              <div key={i} className="post">
                <img
                  src={item.img}
                  alt="post"
                  style={{ width: "30rem", cursor: "pointer", height:"25rem" }}
                  onClick={() => descPage(item._id)}
                />
                <p className="user">@{item.user.username} </p>

                <div className="descAndTime">
                  <hr />
                  <p>{item.desc} </p>
                  <hr />
                  <p className="time">{item.time} </p>
                </div>
                <div className="btns">
                  {state.signIn.user.role === "61a734cd947e8eba47efbc68" ||
                  state.signIn.user._id === item.user._id ? (
                    <button
                      onClick={() => deletePost(item._id)}
                      style={{ cursor: "pointer" }}
                      className="btn"
                      id="deleteBtn"
                    >
                      Delete Post
                    </button>
                  ) : (
                    <p></p>
                  )}

                  <UpdatePost
                    postId={item._id}
                    userId={item.user._id}
                    getPost={getPost}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;

// Like button
// const like = async (postId, userId) => {
//   let res = await axios.post(
//     `${process.env.REACT_APP_BASE_URL}/like/${userId}/${postId}`,
//     {
//       headers: { Authorization: `Bearer ${state.signIn.token}` },
//     }
//   );
// };

// Test
// const likesCount = async (id) => {
//   let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/likes/${id}`);
// };

// useEffect(() => {
//   likesCount();
// }, []);

// updatePost

/* <button onClick={() => like(item._id, item.user._id)}>
                {" "}
                Like
              </button> */
