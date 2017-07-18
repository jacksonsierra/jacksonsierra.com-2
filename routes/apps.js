import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('apps', {
    path: 'apps',
    title: 'Jackson Sierra - Apps',
  })
})

export default router
