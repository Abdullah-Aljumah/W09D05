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
    console.log(res, "RESRESRRES");
    getPost();
  };

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
