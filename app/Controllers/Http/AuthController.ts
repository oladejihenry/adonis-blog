import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public showRegister ({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register ({ request, auth, response }: HttpContextContract) {
    const validationSchema = schema.create({
      username: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.maxLength(255),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [
        rules.confirmed(),
      ])
    })

    const validatedData = await request.validate({
      schema: validationSchema,
    })
    
    const user = await User.create(validatedData)

    await auth.login(user)

    return response.redirect('/dashboard')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async showLogin ({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login ({ auth, request, session, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {

      await auth.attempt(email, password)

      return response.redirect('/dashboard')
    }
    catch (error) {
      session.flash({ error: 'Invalid credentials' })
      return response.redirect('back')
    }
  }
}
