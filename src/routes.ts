import { Router } from 'express'
import { CreateDefaultProductsController } from './controllers/CreateDefaultProductsController'
import { ListProductsController } from './controllers/ListProductsController'
import { PrintPdfProductsController } from './controllers/PrintPdfProductsController'

const routes = Router()
const createDefaultProductsController = new CreateDefaultProductsController()
const listProductsController = new ListProductsController()
const printPdfProductsController = new PrintPdfProductsController()

routes.post('/products/default', createDefaultProductsController.handle)
routes.get('/products', listProductsController.handle)
routes.get('/products/report', printPdfProductsController.handle)
export { routes }
