const router = require('express').Router();

const { put } = require('.');
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

    router.route('/:thoughtId/reactions').post(addReaction);
    router.route('/:thoughtId/reactions').delete(removeReaction);

    module.exports = router;