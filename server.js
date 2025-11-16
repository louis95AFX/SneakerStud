import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
// CORS setup
app.use(cors({
    origin: "https://sneakerstud.co.za",
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

// --- 1. Setup Nodemailer ---
const transporter = nodemailer.createTransport({
    host: "mail.sneakerstud.co.za",
    port: 587,
    secure: false, // MUST be false for port 587
    auth: {
        user: "info@sneakerstud.co.za",
        pass: "Sjbh-12Afg*"
    },
    tls: {
        rejectUnauthorized: false // important for shared hosting
    }
});



// --- 2. Email Route ---
app.post("/send-email", async (req, res) => {
    const data = req.body;

    const emailContent = `
🧾 NEW ORDER RECEIVED 🧾

Customer Name: ${data.customerName}
Customer Email: ${data.customerEmail}
Customer Phone: ${data.customerPhone}

Order Number: ${data.orderNumber}

===== ORDER SUMMARY =====
${data.cartSummary}

Subtotal: R${data.subtotal}
Shipping Fee: R${data.appliedShipping}
TOTAL: R${data.totalWithShipping}

===== PAYMENT INSTRUCTIONS =====
${data.paymentInstructions}
`;

    try {
       await transporter.sendMail({
    from: `"Sneaker Stud Orders" <info@sneakerstud.co.za>`,
    to: `info@sneakerstud.co.za, ${data.customerEmail}`,
    subject: `New Order #${data.orderNumber}`,
    text: emailContent
});


        res.json({ message: "Order sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
});

// Run Server
app.listen(3000, () => console.log("Server running on port 3000"));
