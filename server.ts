import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Email Transporter (requires SMTP config in .env)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // API Routes
  app.post("/api/contact", async (req, res) => {
    console.log("Contact form submission received:", req.body);
    const { name, email, message, agreedToPrivacy } = req.body;

    if (!agreedToPrivacy) {
      return res.status(400).json({ error: "You must agree to the privacy policy." });
    }

    const mailOptions = {
      from: process.env.SMTP_USER || "noreply@gidonblaustein.co.il",
      to: "hello@gidonblaustein.co.il",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.log("SMTP not configured. Submission received:", mailOptions);
      }
      res.json({ success: true, message: "Message received successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message." });
    }
  });

  app.post("/api/subscribe", async (req, res) => {
    console.log("Subscription request received:", req.body);
    const { name, email, whatsapp, agreedToPrivacy } = req.body;

    if (!agreedToPrivacy) {
      return res.status(400).json({ error: "You must agree to the privacy policy." });
    }

    const mailOptions = {
      from: process.env.SMTP_USER || "noreply@gidonblaustein.co.il",
      to: "hello@gidonblaustein.co.il",
      subject: `New Guide Subscription: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}`,
      html: `
        <h3>New Guide Subscription</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
      `,
    };

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.log("SMTP not configured. Subscription received:", mailOptions);
      }
      res.json({ success: true, message: "Subscription successful!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to subscribe." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
