import express from 'express'
import ensureAuth from '../middleware/ensureAuth.js'
import stories from '../controllers/storiesController.js'

const router = express.Router()

// /stories/createStory
router.post('/createStory', ensureAuth, stories.createStory)

// /stories/feed
router.get('/feed', stories.publicStories)

// /stories/feed
router.get('/userFeed', ensureAuth, stories.publicStories)

// /stories/dashboard get dashboard data
router.get('/dashboard', ensureAuth, stories.dashboardData)

// /stories/id
router.get('/:id', stories.getStory)

// /stories/edit/id
router.put('/edit/:id', ensureAuth, stories.editStory)

// /stories/delete/id
router.delete('/delete/:id', ensureAuth, stories.deleteStory)

// /stories/user/userId
router.get('/user/:userId', stories.getUserPublicStories )

export default router