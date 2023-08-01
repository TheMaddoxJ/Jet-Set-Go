const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    saveLocation,
    deleteLocation,
    login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../util/auth');

router.route('/').post(createUser).put(authMiddleware, saveLocation);
router.route('/login').post(login);
router.route('/me').get(authMiddleware, getSingleUser);
router.route('/location/:locationId').delete(authMiddleware, deleteLocation);

module.exports = router;
