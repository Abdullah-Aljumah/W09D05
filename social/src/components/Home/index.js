import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import NewPost from "../NewPost";
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
  const updatePost = async (e, id) => {
    e.preventDefault();

    // eslint-disable-next-line
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updatePost/${id}`,
      {
        desc: e.target[0].value,
      },
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    e.target[0].value = "";
    getPost();
  };

  const descPage = (id) => {
    navigate(`/${id}`);
  };

  // const newPost = async () => {
  //   navigate("/newPost");
  // };

  const toggleNewPost = () => {
    setPost(!post);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => toggleNewPost()}>New post</button>
      {post ? <NewPost setPost={setPost} getPost={getPost} /> : <p></p>}

      {posts &&
        posts.map((item, i) => {
          return (
            <div key={i}>
              <p>@{item.user.username} </p>
              <img
                src={item.img}
                alt="post"
                style={{ width: "20rem", cursor: "pointer" }}
                onClick={() => descPage(item._id)}
              />
              <p>{item.desc} </p>
              <p>{item.time} </p>
              {state.signIn.user.role === "61a734cd947e8eba47efbc68" ||
              state.signIn.user._id === item.user._id ? (
                <button
                  onClick={() => deletePost(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete Post
                </button>
              ) : (
                <p></p>
              )}

              {state.signIn.user.role === "61a734cd947e8eba47efbc68" ||
              state.signIn.user._id === item.user._id ? (
                <form onSubmit={(e) => updatePost(e, item._id)}>
                  <input type="text" name="update" placeholder=" update..." />
                  <input
                    type="submit"
                    value="Update"
                    style={{ cursor: "pointer" }}
                  />
                </form>
              ) : (
                <p></p>
              )}

              <hr />
            </div>
          );
        })}

      <form onClick={logOut}>
        <button type="submit" style={{ cursor: "pointer" }}>
          {" "}
          Log out{" "}
        </button>
      </form>
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
