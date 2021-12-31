import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  public async home ({ view }: HttpContextContract) {
    return view.render('home')
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
