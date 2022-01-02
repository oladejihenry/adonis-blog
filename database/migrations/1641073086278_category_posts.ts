import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryPosts extends BaseSchema {
  protected tableName = 'category_posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('post_id').unsigned().index('post_id')
      table.integer('category_id').unsigned().index('category_id')
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.foreign('category_id').references('categories.id').onDelete('cascade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
