import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/send-test', async (req, res) => {
  try {
    const port = Number(process.env.MAIL_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port,
      secure: port === 465, // برای 465 true
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    // اتصال SMTP را چک کن
    await transporter.verify();

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: 'API test mail',
      text: 'It works!',
    });

    res.json({ ok: true, messageId: info.messageId });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
