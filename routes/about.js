import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('about', {
    path: 'about',
    title: 'Jackson Sierra - About',
  })
})

export default router
