import puppeteer from 'puppeteer'

export class GeneratePDF {
  async generatePDF(responsedata: any) {

    const browser = await puppeteer.launch({
      headless: true,

      slowMo: 50,

      args: ["--no-sandbox", "--disable-setuid-sandbox"],

      timeout: 60000,
    });

    const page = await browser.newPage();

    // Create HTML template

    let htmlContent = "<html><body>";


    responsedata.forEach((order: any) => {
      htmlContent += `<p>Order ID: ${order._id}</p>

                      <p>Restaurant Name: ${order.rname}</p>

                      <p>Username: ${order.username}</p>

                      <table border="1" cellpadding=20 cellmargin=20  style="width:100%;" >

                          <thead>

                              <tr>

                                  <th>Product Name</th>

                                  <th>Quantity</th>

                                  <th>Price</th>

                              </tr>

                          </thead>

                          <tbody>`;

      order.product1.forEach((product: any) => {
        htmlContent += `<tr>

                              <td>${product.productName}</td>

                              <td>${product.quantity}</td>

                              <td>${product.price}</td>

                          </tr>`;
      });

      htmlContent += `<tr>

                      <td colspan="3" style="text-align:end">Total: ${order.total}</td>

                      </tr>

                      </tbody>

                      </table>

                      <br>`;
    });


    htmlContent += "</body></html>";

    //   // Set content and generate PDF

    await page.setContent(htmlContent);

    await page.pdf({ path: "orderData.pdf", format: "A4", timeout: 80000 });

    await browser.close();
  }
}
