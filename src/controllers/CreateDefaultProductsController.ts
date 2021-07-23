import { Request, Response } from 'express'
import { CreateDefaultProductsService } from '../service/CreateDefaultProductsService'
class CreateDefaultProductsController {
  async handle(request: Request, response: Response) {
    const createDefaultProductsService = new CreateDefaultProductsService()
    const productsCreated = await createDefaultProductsService.execute()
    return response.status(201).json(productsCreated)
  }
}

export { CreateDefaultProductsController }
