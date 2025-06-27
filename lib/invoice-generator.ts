import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

export interface InvoiceData {
  id: string;
  invoice_number: string;
  firm: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  period_start: string;
  period_end: string;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  due_date?: string;
  line_items: Array<{
    description: string;
    hours: number;
    rate: number;
    amount: number;
    date?: string;
    matter?: {
      client_name: string;
      matter_description: string;
    };
  }>;
}

export function generateInvoicePDF(invoiceData: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Header
      doc.fontSize(20)
         .text(invoiceData.firm.name, 50, 50)
         .fontSize(10)
         .text(invoiceData.firm.address || '', 50, 80)
         .text(invoiceData.firm.phone || '', 50, 95)
         .text(invoiceData.firm.email || '', 50, 110);

      // Invoice title and number
      doc.fontSize(24)
         .text('INVOICE', 400, 50)
         .fontSize(12)
         .text(`Invoice #: ${invoiceData.invoice_number}`, 400, 80)
         .text(`Date: ${format(new Date(), 'MM/dd/yyyy')}`, 400, 95);

      if (invoiceData.due_date) {
        doc.text(`Due Date: ${format(new Date(invoiceData.due_date), 'MM/dd/yyyy')}`, 400, 110);
      }

      // Billing period
      doc.fontSize(14)
         .text('Billing Period', 50, 160)
         .fontSize(12)
         .text(`${format(new Date(invoiceData.period_start), 'MM/dd/yyyy')} - ${format(new Date(invoiceData.period_end), 'MM/dd/yyyy')}`, 50, 180);

      // Line items table
      let yPosition = 220;
      
      // Table headers
      doc.fontSize(10)
         .text('Date', 50, yPosition, { width: 60 })
         .text('Matter', 120, yPosition, { width: 150 })
         .text('Description', 280, yPosition, { width: 200 })
         .text('Hours', 490, yPosition, { width: 40, align: 'right' })
         .text('Rate', 540, yPosition, { width: 50, align: 'right' })
         .text('Amount', 600, yPosition, { width: 60, align: 'right' });

      // Table line
      yPosition += 15;
      doc.moveTo(50, yPosition)
         .lineTo(560, yPosition)
         .stroke();

      yPosition += 10;

      // Line items
      invoiceData.line_items.forEach((item) => {
        if (yPosition > 700) { // Start new page if needed
          doc.addPage();
          yPosition = 50;
        }

        const itemDate = item.date ? format(new Date(item.date), 'MM/dd/yy') : '';
        const matterInfo = item.matter ? 
          `${item.matter.client_name}\n${item.matter.matter_description.substring(0, 30)}...` : '';

        doc.fontSize(9)
           .text(itemDate, 50, yPosition, { width: 60 })
           .text(matterInfo, 120, yPosition, { width: 150 })
           .text(item.description, 280, yPosition, { width: 200 })
           .text(item.hours.toFixed(2), 490, yPosition, { width: 40, align: 'right' })
           .text(`$${item.rate.toFixed(2)}`, 540, yPosition, { width: 50, align: 'right' })
           .text(`$${item.amount.toFixed(2)}`, 600, yPosition, { width: 60, align: 'right' });

        yPosition += Math.max(20, Math.ceil(item.description.length / 40) * 10 + 10);
      });

      // Totals
      yPosition += 20;
      doc.moveTo(400, yPosition)
         .lineTo(560, yPosition)
         .stroke();

      yPosition += 10;
      doc.fontSize(11)
         .text(`Subtotal: $${invoiceData.subtotal.toFixed(2)}`, 450, yPosition, { align: 'right' });

      if (invoiceData.tax_amount > 0) {
        yPosition += 15;
        doc.text(`Tax: $${invoiceData.tax_amount.toFixed(2)}`, 450, yPosition, { align: 'right' });
      }

      yPosition += 15;
      doc.fontSize(14)
         .text(`Total: $${invoiceData.total_amount.toFixed(2)}`, 450, yPosition, { align: 'right' });

      // Footer
      doc.fontSize(8)
         .text('Thank you for your business!', 50, 750, { align: 'center', width: 500 });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
} 