import { client } from '../database/client'

export type Product = {
  code_bar: string
  description: string
  price: number
  quantity: number
}

const defaultProducts: Product[] = [
  {
    code_bar: '467334413658',
    description: 'Teclado USB',
    price: 500,
    quantity: 30
  },
  {
    code_bar: '618612566376',
    description: 'Headset Bluetooth',
    price: 750,
    quantity: 20
  },
  {
    code_bar: '394934633712',
    description: 'AMD Ryzen 5 3600',
    price: 2100,
    quantity: 5
  },
  {
    code_bar: '431414971421',
    description:
      'Placa de Vídeo Zotac Gaming NVIDIA GeForce RTX 2060, 6GB, GDDR6 - ZT-T20600H-10M',
    price: 3449.9,
    quantity: 4
  },
  {
    code_bar: '623183768530',
    description:
      'Placa de Vídeo Gigabyte Aorus NVIDIA GeForce RTX 3060 Elite, RGB, 12G, GDDR6, DLSS, Ray Tracing - GV-N3060AORUS E-12GD (rev 2.0)',
    price: 4999.9,
    quantity: 6
  }
]

class CreateDefaultProductsService {
  async execute() {
    const productsInserted: Product[] = []
    for await (const {
      code_bar,
      description,
      price,
      quantity
    } of defaultProducts) {
      const productInserted = await client.products.create({
        data: {
          code_bar,
          description,
          price,
          quantity
        }
      })

      productsInserted.push(productInserted)
    }

    return productsInserted
  }
}

export { CreateDefaultProductsService }
