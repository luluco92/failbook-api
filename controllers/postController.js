const { Thought, User } = require('../models');

module.exports = {
  getPosts(req, res) {
    Thought.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(500).json(err));
  },
  getSinglePost(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'Invalid Thought' })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new post and add it to user's post array too
  createPost(req, res) {
    Thought.create(req.body)
      .then((post) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: post._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created for unknown user',
            })
          : res.json('Thought created')
      )
      .catch((err) => res.status(500).json(err));
  },
updatePost(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'Invalid Thought' })
          : res.json(post)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deletePost(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'Invalid Thought' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought deleted for unknown user' })
          : res.json({ message: 'Thought deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a response
  addReply(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'Invalid Thought' })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove response
  deleteReply(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { responseId: req.params.responseId } } },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'Invalid Thought' })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
};
