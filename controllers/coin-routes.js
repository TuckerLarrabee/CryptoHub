const { Post, } = require('../models');

const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/:id', (req,res) => {
//   Post.findOne({
//           where: {
//             id: req.params.id
//           },
//           attributes: [
//             'id',
//             'post_url',
//             'title',
//             'created_at',
//           ],
    
//     res.render('specific-coin', )
// })

router.get('/:id', (req, res) => {
    Post.findAll({
      where: {
        coin_id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      // include: [
      //   {
      //     model: Comment,
      //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      //     include: {
      //       model: User,
      //       attributes: ['username']
      //     }
      //   },
      //   {
      //     model: User,
      //     attributes: ['username']
      //   }
      // ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        console.log("-------------", dbPostData)

        const posts = dbPostData.map(post => post.get({ plain: true }));
        // res.render('dashboard', { posts, loggedIn: true });
  
        // const post = dbPostData.get({ plain: true });
        // console.log("=========", post)

        res.render(`specific-coin-${req.params.id}`
          , {
            posts,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;