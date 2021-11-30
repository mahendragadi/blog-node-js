const userRoutes = {

    'POST /register': {path:'userController.add',middlewares:[]},
    'GET /': 'userController.getAll',
    'DELETE /:id': 'userController.remove',
    'PUT /:id': 'userController.update',
    'GET /:id': 'userController.uniqUser',
    'POST /login':'userController.userLogin',
    'POST /create': 'postController.addPost',
    'GET /post/getAll': 'postController.getAllPosts',
    'GET /post/:id': 'postController.getPostById',
    'DELETE /post/:id': 'postController.removePost',
    'PUT /post/:id': 'postController.updatePost'

};


module.exports = userRoutes;