const router = require('express').Router();
const {
  getSinglePost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  addReply,
  deleteReply,
} = require('../../controllers/postController');

// /api/thoughts. These are defined in post controllers
router.route('/').get(getPosts).post(createPost);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
   .get(getSinglePost)
   .delete(deletePost)
   .put(updatePost);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReply);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReply);

module.exports = router;
