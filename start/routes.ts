/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PagesController.home')


Route.get('/dashboard', 'PagesController.dashboard').middleware('auth')

Route.group(() => {
  Route.get('/all-posts', 'PostsController.index').as('all-posts')
  Route.get('/create', 'PostsController.create').as('create.post')
  Route.post('/store', 'PostsController.store').as('store.post')
  Route.get('/edit/:id', 'PostsController.edit')
  Route.post('/update/:id', 'PostsController.update')
  Route.delete('/delete/:id', 'PostsController.delete').as('delete.post')
}).prefix('/dashboard').middleware('auth')

Route.group(() => {
  Route.get('/all-categories', 'CategoriesController.index').as('all-categories')
  Route.get('/category/create', 'CategoriesController.create').as('create.category')
  Route.post('/category/store', 'CategoriesController.store')
  Route.get('/category/edit/:id', 'CategoriesController.edit')
  Route.post('/category/update/:id', 'CategoriesController.update')
  Route.delete('/category/delete/:id', 'CategoriesController.delete').as('delete.category')
}).prefix('/dashboard').middleware('auth')

Route.get('/register', 'AuthController.showRegister').middleware('guest')
Route.post('/register', 'AuthController.register').as('register')
Route.post('/logout', 'AuthController.logout').as('logout')
Route.get('/login', 'AuthController.showLogin').middleware('guest')
Route.post('/login', 'AuthController.login').as('login')

Route.get('/:slug', 'PagesController.show')
Route.get('/category/:slug', 'PagesController.categoryShow')