import axios from "axios";
import { axiosJWT } from "./UserService";
export const createComment = async (data, access_token) => {
  console.log("acccess", { access_token, data });
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/comment/create/${data.user}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getCommentByProductId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/comment/get-all-comment/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteComment = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/comment/delete-comment/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
