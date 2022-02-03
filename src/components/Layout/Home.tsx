import { Box, Button, Typography } from "@material-ui/core";
import CreatePostModal from "components/Home/CreatePostModal";
import HomeTable from "components/Home/HomeTable";
import PostItem from "components/Home/PostItem";
import DeleteModal from "components/shared/DeleteModal/DeleteModal";
import Loading from "components/shared/Loading/Loading";
import Select from "components/shared/Select/Select";
import { IPost, IPosts, postsData } from "interface/posts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import { State } from "state/reducers";
import "../Home/home.css";

const limitPage = [5, 10, 15, 20];
const usersId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface IFacet {
  start: number;
  limit: number;
  userId?: number;
}

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
    console.log(page);

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
        <Box my={2} width="100%" display="flex" justifyContent="space-between">
          <Select
            list={usersId}
            label="Filter bu user's id:"
            onChange={(e) =>
              setFacet({ ...facet, userId: Number(e.target.value) })
            }
            value={facet.userId ?? 0}
          />
          <Button
            onClick={() =>
              setCreatePostData({
                open: true,
              })
            }
            color="primary"
            variant="contained"
          >
            Create a post
          </Button>
        </Box>
        <div className="tableWrapper">
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
        </div>
      </Box>
      {!!forDelete && (
        <DeleteModal
          onClose={() => setForDelete(undefined)}
          onDelete={() => {
            handleDelete(forDelete.id);
            setForDelete(undefined);
          }}
        />
      )}
      {!!createPostData.open && (
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
      )}
    </>
  );
};

export default Home;
