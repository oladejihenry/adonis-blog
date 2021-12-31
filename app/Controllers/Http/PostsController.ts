import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  public async index ({ view }: HttpContextContract) {
    const posts = await Post.all()
    return view.render('posts/index', { posts })
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store ({ request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.maxLength(255)
      ]),
      body: schema.string({ trim: true }, [
        // rules.maxLength(255)
      ])
    })

    const validatedData = await request.validate({ 
      schema: validationSchema,
      messages: {
        'title.required': 'Post title is required',
        'title.maxLength': 'Post title must be less than 255 characters',
        'body.required': 'Post body is required',
      } 
    })

    await Post.create({
      title: validatedData.title,
      body: validatedData.body,
    })

    session.flash({'notification': 'Post created successfully'})

    return response.redirect('/dashboard/all-posts')
  }

  public async edit ({ params, view }: HttpContextContract) {
    const post = await Post.find(params.id)
    return view.render('posts/edit', { post })
  }

  public async update ({ params, request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.maxLength(255)
      ]),
      body: schema.string({ trim: true }, [
        // rules.maxLength(255)
      ])
    })

    const validatedData = await request.validate({ 
      schema: validationSchema,
      messages: {
        'title.required': 'Post title is required',
        'title.maxLength': 'Post title must be less than 255 characters',
        'body.required': 'Post body is required',
      } 
    })

    const post = await Post.find( params.id )
    post.title = validatedData.title
    post.body = validatedData.body
    await post.save()
  
    session.flash({'notification': 'Post updated successfully'})

    return response.redirect('/dashboard/all-posts')
  }
}
