import { Box, Typography } from "@material-ui/core";
import HomeTable from "components/Home/HomeTable";
import HomeTopComponents from "components/Home/HomeTopComponents";
import PostItem from "components/Home/PostItem";
import Loading from "components/shared/Loading/Loading";
import { IFacet } from "interface/general";
import { IPost, postsData } from "interface/posts";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import { State } from "state/reducers";

// lazy imports
const DeleteModal = React.lazy(
  () => import("components/shared/DeleteModal/DeleteModal")
);
const CreatePostModal = React.lazy(
  () => import("components/Home/CreatePostModal")
);

const limitPage = [5, 10, 15, 20];

interface ICreatePostData {
  open: boolean;
  post?: IPost;
}

const Home = () => {
  const dispatch = useDispatch();
  const { getPosts, createPost, updatePost, deletePost } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const { loading, posts, error } = useSelector(
    (state: State) => state.posts as postsData
  );

  const [list, setList] = useState<IPost[]>([]);
  const [facet, setFacet] = useState<IFacet>({
    start: 0,
    limit: 10,
    userId: undefined,
  });
  const [forDelete, setForDelete] = useState<IPost>();
  const [createPostData, setCreatePostData] = useState<ICreatePostData>({
    open: false,
    post: undefined,
  });

  useEffect(() => {
    getPosts(facet.start, facet.limit, facet.userId);
  }, [facet]);

  useEffect(() => {
    if (!!posts) setList(posts);
  }, [posts]);

  if (error) return <span>Error in getting Posts data</span>;

  const handleChangePage = (page: number) => {
    setFacet({ ...facet, start: page * facet.limit - facet.limit });
  };

  const handleDelete = (postId: number) => {
    deletePost(postId, () => {
      setList(list.filter((item) => item.id !== postId));
    });
  };

  const handleEditOrCreatePost = (post: IPost) => {
    const isCreate = post.id === -1;
    if (isCreate) {
      createPost(post, (post) => setList([post, ...list]));
    } else {
      updatePost(post, (post) => {
        const updatedPostIndex = list.indexOf(
          list.find((item) => item.id === post.id) as IPost
        );
        const newList = JSON.parse(JSON.stringify(list));
        newList[updatedPostIndex] = post;
        setList(newList);
      });
    }
    setCreatePostData({
      open: false,
      post: undefined,
    });
  };

  return (
    <>
      <Box p={3}>
        <Typography variant="h4">Posts Table</Typography>
        <Box my={2}>
          <HomeTopComponents
            facet={facet}
            handleFilter={(e) =>
              setFacet({ ...facet, start: 0, userId: Number(e.target.value) })
            }
            handleCreate={() =>
              setCreatePostData({
                open: true,
              })
            }
          />
        </Box>
        <Box>
          {loading ? (
            <Loading />
          ) : (
            <HomeTable
              handelChangePage={handleChangePage}
              page={facet.start / facet.limit}
              limit={facet.limit}
              limitList={limitPage}
              handleChangeLimit={(limit) =>
                setFacet({
                  ...facet,
                  start: 0,
                  limit: limit,
                })
              }
            >
              {list.map((post) => (
                <PostItem
                  post={post}
                  key={`home-post-item-${post.id}-userId-${post.userId}`}
                  handleDelete={() => setForDelete(post)}
                  handleEdit={() =>
                    setCreatePostData({
                      open: true,
                      post: post,
                    })
                  }
                />
              ))}
            </HomeTable>
          )}
        </Box>
      </Box>
      {!!forDelete && (
        <Suspense fallback={<div>Loading...</div>}>
          <DeleteModal
            onClose={() => setForDelete(undefined)}
            onDelete={() => {
              handleDelete(forDelete.id);
              setForDelete(undefined);
            }}
          />
        </Suspense>
      )}
      {!!createPostData.open && (
        <Suspense fallback={<div>Loading...</div>}>
          <CreatePostModal
            onClose={() =>
              setCreatePostData({
                open: false,
                post: undefined,
              })
            }
            handleSubmit={handleEditOrCreatePost}
            post={createPostData.post}
          />
        </Suspense>
      )}
    </>
  );
};

export default Home;
