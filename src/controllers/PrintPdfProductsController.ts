import { Request, Response } from 'express'
import { ListProductsService } from '../service/ListProductsService'
import PDFPrinter from 'pdfmake'
import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces'
import moment from 'moment'

class PrintPdfProductsController {
  async handle(request: Request, response: Response) {
    const listProductsService = new ListProductsService()
    const products = await listProductsService.execute()

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    }
    const printer = new PDFPrinter(fonts)

    const body = []
    const columnsBody: TableCell[] = []

    const columnsTitle: TableCell[] = [
      { text: 'ID', style: 'columnsTitle' },
      { text: 'Código de barras', style: 'columnsTitle' },
      { text: 'Descrição', style: 'columnsTitle' },
      { text: 'Preço', style: 'columnsTitle' },
      { text: 'Quantidade', style: 'columnsTitle' }
    ]

    columnsTitle.forEach(column => columnsBody.push(column))
    body.push(columnsBody)

    for await (const product of products) {
      const rows = []
      rows.push({ text: product.id, style: 'columnsBody' })
      rows.push({ text: product.code_bar, style: 'columnsBody' })
      rows.push({ text: product.description, style: 'columnsBody' })
      rows.push({ text: `R$ ${product.price}`, style: 'columnsBody' })
      rows.push({ text: product.quantity, style: 'columnsBody' })

      body.push(rows)
    }

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica' },
      content: [
        {
          columns: [
            { text: 'Relátorio de produtos', style: 'header' },
            {
              text: moment().format('DD/MM/YYYY HH:mm') + '\n\n',
              style: 'header'
            }
          ]
        },
        {
          table: {
            heights: row => {
              return 30
            },
            widths: [230, 'auto', 'auto', 60, 'auto'],
            body
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        columnsTitle: {
          fontSize: 13,
          bold: true,
          alignment: 'center',
          fillColor: '#7159c1',
          color: '#fff'
        },
        columnsBody: {
          alignment: 'center'
        }
      }
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinitions)

    const chunks: Buffer[] = []

    pdfDoc.on('data', chunk => {
      chunks.push(chunk)
    })

    pdfDoc.end()

    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks)

      response.end(result)
    })
  }
}

export { PrintPdfProductsController }
