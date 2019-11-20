const router = require('express')()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)
router.patch('/tag', UserController.addWatchedTag)
router.patch('/tag/remove', UserController.deleteWatchedTag)
router.get('/tag', UserController.getWatchedTags)

module.exports = router