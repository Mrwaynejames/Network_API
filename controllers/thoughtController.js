const { Thought, User } = require('../models'); 
module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
          .then(({_id}) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "thought created but no user with that ID!" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body },
            { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((user) => 
      !user
      ?res.json({ message: 'thought deleted, no user found' })
      : res.json({message: 'thought deleted'}))

      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },
};