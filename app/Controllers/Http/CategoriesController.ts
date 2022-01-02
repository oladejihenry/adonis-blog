import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CategoriesController {
  public async index ({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('categories/index', { categories })
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('categories/create')
  }

  public async store ({ request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(255)
      ])
    })

    const validatedData = await request.validate({ 
      schema: validationSchema,
      messages: {
        'name.required': 'Category title is required',
        'name.maxLength': 'Category title must be less than 255 characters',
      } 
    })

    await Category.create({
      name: validatedData.name,
    })

    session.flash({'notification': 'Category created successfully'})

    return response.redirect('/dashboard/all-categories')
  }

  public async edit ({ params, view }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    return view.render('categories/edit', { category })
  }

  public async update ({ params, request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(255)
      ])
    })

    const validatedData = await request.validate({ 
      schema: validationSchema,
      messages: {
        'name.required': 'Post title is required',
        'name.maxLength': 'Post title must be less than 255 characters'
      } 
    })

    const category = await Category.findOrFail( params.id )
    category.name = validatedData.name
    category.description = request.input('description')
    await category.save()
  
    session.flash({'notification': 'Post updated successfully'})

    return response.redirect('/dashboard/all-categories')
  }

  public async delete ({ params, response, session }: HttpContextContract) {
    const category = await Category.findOrFail( params.id )
    await category.delete()
  
    session.flash({'notification': 'Category deleted successfully'})

    return response.redirect('back')
  }
}
