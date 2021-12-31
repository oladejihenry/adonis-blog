import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PagesController {
  public async home ({ view }: HttpContextContract) {
    const posts = await Post.all()
    return view.render('home', { posts })
  }

  public async show ({ params:{slug}, view }: HttpContextContract) {
    const post = await Post.query().where('slug', slug).first()
    return view.render('dashboard/show', { post })
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
