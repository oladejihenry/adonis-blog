import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Category from 'App/Models/Category'

export default class PagesController {
  public async home ({ view }: HttpContextContract) {
    const posts = await Post.all()
    return view.render('home', { posts })
  }

  public async show ({ params:{slug}, view }: HttpContextContract) {
    const post = await Post.query().where('slug', slug).first()
    return view.render('main/show', { post })
  }

  public async categoryShow ({ params:{slug}, view }: HttpContextContract) {
    const category = await Category.query().orderBy('id', 'desc').where('slug', slug).preload('posts').first()
    return view.render('categories/show', { category, posts: category?.posts })
  }

  public async dashboard ({ view }: HttpContextContract) {
    return view.render('dashboard/index',{
      active: 'dashboard',
    })
  }

  public async about ({ view, params }: HttpContextContract) {
    const name = params.name
    return view.render('about', { name })
  }

  public async contact ({ view }: HttpContextContract) {
    return view.render('contact')
  }
}
