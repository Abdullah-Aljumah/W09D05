import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import { VscNewFile } from "react-icons/vsc";

const NewPost = ({ setPost, getPost }) => {
  const state = useSelector((state) => {
    return state;
  });

  //
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");

  // Create new post
  const newPost = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newpost/${state.signIn.user._id}`,
      {
        desc: desc,
        img: img,
      },
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    setPost(false);
    e.target[0].value = "";
    e.target[1].value = "";
    getPost();
  };

  return (
    <div>
      <form
        className="formNewPost"
        onSubmit={(e) => {
          newPost(e);
        }}
      >
        <input
          type="text"
          name="img"
          className="inputNewPost"
          placeholder="Image URL"
          onChange={(e) => setImg(e.target.value)}
        />
        <input
          type="text"
          name="desc"
          className="inputNewPost"
          placeholder="Descriopn"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button type="submit" name="submit" className="btnNewPost">
          {" "}
          New post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
