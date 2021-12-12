import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import "./style.css";

const UpdatePost = ({ postId, userId, getPost }) => {
  const state = useSelector((state) => {
    return state;
  });

  //
  const [toggle, setToggle] = useState(false);

  // update post
  const updatePost = async (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      // eslint-disable-next-line
      let res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/updatePost/${postId}`,
        {
          desc: e.target[0].value,
        },
        {
          headers: { Authorization: `Bearer ${state.signIn.token}` },
        }
      );
      setToggle(false);
      getPost();
      e.target[0].value = "";
    } else {
      setToggle(false);
    }
  };

  return (
    <div>
      <button onClick={() => setToggle(!toggle)} className="btn">
        {" "}
        Update
      </button>
      {toggle ? (
        <div className="updateBtnInput">
          {" "}
          {state.signIn.user.role === "61a734cd947e8eba47efbc68" ||
          state.signIn.user._id === userId ? (
            <form onSubmit={(e) => updatePost(e)}>
              <input type="text" name="update" placeholder=" update..." className="val" />
              <input
              className="btnUpdate"
                type="submit"
                value="Update"
                style={{ cursor: "pointer" }}
                required
              />
            </form>
          ) : (
            <p></p>
          )}{" "}
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
};

export default UpdatePost;
