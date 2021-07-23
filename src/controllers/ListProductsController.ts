import { Request, Response } from 'express'
import { ListProductsService } from '../service/ListProductsService'
class ListProductsController {
  async handle(request: Request, response: Response) {
    const listProductsService = new ListProductsService()
    const products = await listProductsService.execute()
    return response.json(products)
  }
}
export { ListProductsController }
