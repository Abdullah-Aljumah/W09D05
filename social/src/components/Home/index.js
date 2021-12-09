import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const Home = () => {
  const state = useSelector((state) => {
    return state;
  });
  const [posts, setPosts] = useState([]);

  // getPostWithCommentsAndLikes
  const getPost = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/allpost`);
    setPosts(res.data);
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  const logOut = () => {
    localStorage.clear();
  };

  const deletePost = async (id) => {
    console.log(id, "IDDD");

    let res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/softDelete/${id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    // console.log(res, "RESRESRRES");
    getPost();
  };

  const like = async (postId, userId) => {
  
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/like/${userId}/${postId}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    // console.log(typeof res.data);
  };

  const likesCount = async (id) => {
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/likes/${id}`);
    console.log(res.data.length, "LIIIKES");
    // setLikes(res.data.length)
    // return res.data
  };

  useEffect(() => {
    likesCount();
  }, []);

  const updatePost = (id) =>{
      console.log(id);
  }
  return (
    <div>
      <h1>Home</h1>
      {posts &&
        posts.map((item, i) => {
          return (
            <div key={i}>
              <p>@{item.user.username} </p>
              <img src={item.img} alt="post" style={{ width: "20rem" }} />
              <p>{item.desc} </p>
              <p>{item.time} </p>
              {state.signIn.user.role === "61a734cd947e8eba47efbc68" ||
              state.signIn.user._id === item.user._id ? (
                <button onClick={() => deletePost(item._id)}>
                  Delete Post
                </button>
              ) : (
                <p></p>
              )}

              <button onClick={() => like(item._id, item.user._id)}>
                {" "}
                Like
              </button>
              <input type="text" name="update" placeholder="Update post" onChange={()=>updatePost(item._id)} />
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
