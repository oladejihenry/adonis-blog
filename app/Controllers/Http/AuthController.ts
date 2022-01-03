import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public showRegister ({ view }: HttpContextContract) {
    return view.render('auth/register')
  }
}
