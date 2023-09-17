import { v4 as uuidv4 } from 'uuid';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getMockPostsFromLocalStorage = () => {
  const storedPosts = localStorage.getItem('mockPosts');
  return storedPosts ? JSON.parse(storedPosts) : [];
};

const setMockPostsInLocalStorage = (posts) => {
  localStorage.setItem('mockPosts', JSON.stringify(posts));
};

const fetchAllPosts = async () => {
  await delay(1000); 
  const mockPosts = getMockPostsFromLocalStorage();
  return mockPosts;
};

const fetchPost = async (postId) => {
  await delay(1000); 
  const mockPosts = getMockPostsFromLocalStorage();
  const post = mockPosts.find((p) => p.id === postId);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

const createPost = async (newPost) => {
  await delay(1000); 
  const mockPosts = getMockPostsFromLocalStorage();
  const newId = uuidv4();
  const createdPost = { ...newPost, id: newId, status: 'CREATED' };
  mockPosts.push(createdPost);
  setMockPostsInLocalStorage(mockPosts);
  return createdPost;
};

const updatePost = async (postId, updatedPost) => {
  await delay(1000); 
  const mockPosts = getMockPostsFromLocalStorage();
  const index = mockPosts.findIndex((post) => post.id === postId);
  if (index !== -1) {
    mockPosts[index] = { ...mockPosts[index], ...updatedPost };
    setMockPostsInLocalStorage(mockPosts); 
    return mockPosts[index];
  }
  throw new Error('Post not found');
};

const schedulePost = async (postId) => {
  await delay(1000); 
  const mockPosts = getMockPostsFromLocalStorage();
  const post = mockPosts.find((p) => p.id === postId);
  if (post) {
    post.status = 'SCHEDULED';
    setMockPostsInLocalStorage(mockPosts);
    return post;
  }
  throw new Error('Post not found');
};

const cancelSchedule = async (postId) => {
  await delay(1000); 
  const mockPosts = getMockPostsFromLocalStorage();
  const post = mockPosts.find((p) => p.id === postId);
  if (post) {
    post.status = 'CREATED';
    setMockPostsInLocalStorage(mockPosts); 
    return post;
  }
  throw new Error('Post not found');
};

const publishPost = async (postId) => {
  await delay(1000); 
  const mockPosts = getMockPostsFromLocalStorage();
  const postIndex = mockPosts.findIndex((p) => p.id === postId);
  if (postIndex !== -1) {
    mockPosts[postIndex].status = 'PUBLISHED';
    setMockPostsInLocalStorage(mockPosts);
    return mockPosts[postIndex];
  }
  throw new Error('Post not found');
};

const deletePost = async (postId) => {
  await delay(1000);
  const mockPosts = getMockPostsFromLocalStorage();
  const postIndex = mockPosts.findIndex((p) => p.id === postId);
  if (postIndex !== -1) {
    mockPosts.splice(postIndex, 1);
    setMockPostsInLocalStorage(mockPosts); 
    return true; 
  }
  throw new Error('Post not found');
};

export {
  fetchAllPosts,
  fetchPost,
  createPost,
  updatePost,
  schedulePost,
  cancelSchedule,
  publishPost,
  deletePost
};
