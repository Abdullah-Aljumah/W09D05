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
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/${state.signIn.user._id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    console.log(res.data);
    setPosts(res.data);
  };
  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {posts &&
        posts.map((item, i) => {
          return (
            <div key={i}>
              <img src={item.img} alt="post" />
              <p>{item.desc}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
