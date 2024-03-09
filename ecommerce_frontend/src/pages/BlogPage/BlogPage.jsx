import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import * as PostService from "../../services/PostService";
import slidergiangsinh1 from "../../assets/images/noel1.png";
import { Button, Image, Modal } from "antd";
import {
  CloudFilled,
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  MessageFilled,
} from "@ant-design/icons";
import { WrapperH1 } from "./style";
import logo from "../../assets/images/logo-decoration.png";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useSelector } from "react-redux";

const BlogPage = () => {
  const user = useSelector((state) => state?.user);
  console.log("user", user);
  const [postLiked, setPostLiked] = useState([]);
  const [likeCount, setLikeCount]  =useState([])
   const [isModalOpen, setIsModalOpen] = useState(false);
  const getAllPost = async () => {
    const res = await PostService.getAllPost();
    return res;
  };
  const queryPost = useQuery({ queryKey: ["posts"], queryFn: getAllPost });
  const { data: posts } = queryPost;
  
  useEffect(() => {
    const newLikeCount =[]
    posts?.data?.forEach(post => {
        newLikeCount.push({
          id: post?._id,
          like: post?.likeCount?.length
        })
    });
    setLikeCount(newLikeCount)
}, [posts]);

  console.log("likeCount", likeCount)


  const custumDay = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const mutationGetPostLiked = useMutationHook((data) => {
    const { token, ...rests } = data;
    const res = PostService.getPostLiked(token, { ...rests });
    return res;
  });
  const {
    data: dataGet,
    isLoading: isLoadingGet,
    isSuccess: isSuccessGet,
    isError: isErrorGet,
  } = mutationGetPostLiked;

  const getPostLiked = () => {
    mutationGetPostLiked.mutate({
      token: user?.access_token,
      userId: user?.id,
    });
  };
  useEffect(() => {
    getPostLiked();
  }, [user?.id]);

  useEffect(() => {
    if (dataGet?.status === "OK") {
      setPostLiked(dataGet?.data);
    }
  }, [dataGet]);
  console.log("postLiked", postLiked);
  useEffect(() => {}, [postLiked]);

  const mutationDeletedLike = useMutationHook((data) => {
    const { id, token } = data;
    const res = PostService.deleteLike(id, token);
    return res;
  });
  const {
    data: dataDeleteLike,
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
  } = mutationDeletedLike;
  const mutationAddLike = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = PostService.addLike(id, token, { ...rests });
    return res;
  });
  const {
    data: dataAddLike,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationAddLike;


  const onAddLike = (idPost) => {
    mutationAddLike.mutate({
      id: idPost,
      token: user?.access_token,
      likeCount: [
        {
          name: user?.name,
          user: user?.id,
        },
      ],
    });
  };

  const onDeleteLike = () => {
    mutationDeletedLike.mutate({ id: user?.id, token: user?.access_token }, {});
  };

  const isPostLike = (postId) => {
    if (postLiked?.includes(postId)) {
      return true;
    } else {
      return false;
    }
  };
const likePost = (postId) => {
    setLikeCount(prev => {
        const updatedLikeCount = prev.map(item => {
            if (item.id === postId) {
                return { ...item, like: item.like + 1 };
            }
            return item;
        });
        return updatedLikeCount;
    });
};
  const deleteLikePost = (postId) => {
    setLikeCount(prev => {
        const updatedLikeCount = prev.map(item => {
            if (item.id === postId) {
                return { ...item, like: item?.like> 0 ? item.like - 1: 0 };
            }
            return item;
        });
        return updatedLikeCount;
    });
};

  const onHandleLike = (idPost) => {
    if (isPostLike(idPost) === false) {
      onAddLike(idPost);
        likePost(idPost)    
    } else {
      onDeleteLike();
     deleteLikePost(idPost)
    }
  };

  useEffect(() => {
    if (dataAddLike?.status === "OK" || dataDeleteLike?.status === "OK") {
      getPostLiked();
    }
  }, [dataAddLike, dataDeleteLike]);

  
  const handleComment = (id) => {
    setIsModalOpen(true);
  };
  const handleCancel=()=>{
    setIsModalOpen(false);
  }

  return (
    <>
    <div style={{ background: "#f0f2f5" }}>
      <div style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <img src={logo} style={{ height: "200px" }} />
        </div>
        {posts?.data &&
          posts?.data?.map((post) => {
            return (
              <div
                className="container"
                style={{
                  width: "900px",
                  height: "100%",
                  border: "1px solid rgb(255 253 253)",
                  borderRadius: "30px",
                  background: "#fff",
                  filter: "drop-shadow(1px 2px 2px #333)",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <div style={{ padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "25px",
                          fontWeight: "bold",
                          fontFamily: "inherit",
                        }}
                      >
                        {post.title}
                      </p>{" "}
                      <p>
                        <em>{custumDay(post?.createdAt)}</em>
                      </p>
                    </div>
                    <div>{post?.content}</div>
                  </div>
                  <div
                    style={{
                      height: "500px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {post?.image && post?.image.length === 1 ? (
                      <Image
                        src={post.image[0].urlImage}
                        style={{ width: "100%", height: "100%" }}
                        preview={true}
                      />
                    ) : (
                      post?.image && (
                        <>
                          <Image
                            key={post.image[0].id}
                            src={post.image[0].urlImage}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {post.image.slice(1).map((image, index) => (
                              <Image
                                key={image.id}
                                src={image.urlImage}
                                style={{
                                  width: "100%",
                                  height: `calc(500px / ${
                                    post.image.length - 1
                                  })`,
                                  objectFit: "cover",
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )
                    )}
                  </div>

                  <div style={{ padding: "30px" }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "20px",
                          }}
                        >
                          { likeCount?.length?  likeCount?.find((item)=>item?.id === post?._id).like
                              : post?.likeCount?.length
                          }
                          {" "}
                          <HeartFilled
                            style={{ padding: "0 4px", color: "#d60055" }}
                          />
                        </p>
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "20px",
                          }}
                        >
                          30{" "}
                          <MessageFilled
                            style={{ padding: "0 4px", color: "#1f82f3" }}
                          />
                        </p>
                      </div>
                      <div
                        style={{
                          borderTop: "1px solid #333",
                          paddingTop: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "30px",
                            border: "none",
                            background: "none",
                          }}
                          onClick={() => onHandleLike(post?._id)}
                        >
                          {isPostLike(post?._id) === false ? (
                            <HeartOutlined />
                          ) : (
                            <HeartFilled style={{ color: "#d60055" }} />
                          )}
                        </Button>
                        <Button
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "30px",
                            border: "none",
                            background: "none",
                          }}
                          onClick={()=>handleComment(post?._id)}
                        >
                          <CommentOutlined />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
    <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={false}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
    
  );
};

export default BlogPage;
