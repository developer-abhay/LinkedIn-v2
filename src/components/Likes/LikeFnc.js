import React from "react";
import InputOption from "../Feed/InputOption";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const LikeFnc = ({ likeStats, postID }) => {
  //Accessing the post
  const dbRef = collection(firestore, "posts");

  //Like and Unlike a post
  const likedPost = (e) => {
    const likedBtn = e.currentTarget;

    if (likeStats.liked) {
      if (likedBtn.childNodes[0].style.color === "rgb(50, 130, 200)") {
        likedBtn.childNodes[0].style.color = "gray";
        likedBtn.childNodes[1].style.color = "gray";
        updateDoc(doc(dbRef, postID), {
          likeStats: { liked: false, Count: likeStats.Count - 1 },
        });
      } else {
        likedBtn.childNodes[0].style.color = "rgb(50, 130, 200)";
        likedBtn.childNodes[1].style.color = "rgb(50, 130, 200)";

        updateDoc(doc(dbRef, postID), {
          likeStats: { liked: true, Count: likeStats.Count + 1 },
        });
      }
    } else {
      likedBtn.childNodes[0].style.color = "rgb(50, 130, 200)";
      likedBtn.childNodes[1].style.color = "rgb(50, 130, 200)";

      updateDoc(doc(dbRef, postID), {
        likeStats: { liked: true, Count: likeStats.Count + 1 },
      });
    }
  };
  return (
    <>
      <InputOption
        Icon={ThumbUpIcon}
        title="Like"
        color="gray"
        feature={likedPost}
      />
    </>
  );
};

export default LikeFnc;
