import { client } from '../database/client'

class ListProductsService {
  async execute() {
    const products = await client.products.findMany()
    return products
  }
}
export { ListProductsService }
