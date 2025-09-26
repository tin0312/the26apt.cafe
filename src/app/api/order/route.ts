// app/api/order/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
// import { getServerSession } from "next-auth"; // if using next-auth

export async function POST(req: Request) {
  try {
    const { cart, totalPrice } = await req.json();

    // 1. Get current user email (example with next-auth)
    // const session = await getServerSession(authOptions);
    // const userEmail = session?.user?.email;

    // For demo, hardcode (replace later with session email)
    const userEmail = "customer@example.com";

    // 2. Build HTML bill
    const itemsHtml = cart
      .map(
        (d: any) =>
          `<tr>
             <td>${d.name}</td>
             <td>${d.numberOfOrders}</td>
             <td>$${d.price}</td>
             <td>$${d.price * d.numberOfOrders}</td>
           </tr>`
      )
      .join("");

    const html = `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order, ${userEmail}!</p>
      <table border="1" cellpadding="6" cellspacing="0">
        <thead>
          <tr>
            <th>Drink</th><th>Qty</th><th>Price</th><th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>$${totalPrice}</strong></td>
          </tr>
        </tbody>
      </table>
    `;

    // 3. Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // 4. Send mail
    await transporter.sendMail({
      from: `"Drink Shop" <${process.env.EMAIL_USER}>`,
      to: "justinhoang0312@gmail.com", // fixed email
      subject: "Your Order Receipt",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
