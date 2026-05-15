import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Request Logging Middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Health Check API
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      env: process.env.NODE_ENV || "development",
      mailConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS)
    });
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    console.log("Received contact form submission:", req.body.email);
    const { 
      name, company, phone, email, videoType, scope, length, 
      episodes, filming, schedule, deliveryDate, budget, references, details 
    } = req.body;

    // Validation
    if (!name || !company || !phone || !email) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    try {
      // Configure mail transport
      // If user hasn't provided SMTP details, we can't send but we can log.
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`, // Must be the authenticated user for many providers
        to: "mediaplatee@gmail.com",
        replyTo: email,
        subject: `[제작 문의] ${company} - ${name}님`,
        text: `
[미디어플레이트 제작 문의 내역]

1. 이름 / 담당자명: ${name}
2. 회사명 / 기관명: ${company}
3. 연락처: ${phone}
4. 이메일: ${email}

5. 제작하고자 하는 영상 종류: ${videoType}
6. 필요한 제작 범위: ${Array.isArray(scope) ? scope.join(", ") : scope}
7. 예상 영상 분량: ${length}
8. 제작 편수: ${episodes}
9. 촬영 필요 여부: ${filming}
10. 희망 제작 일정: ${schedule} (납품일: ${deliveryDate})
11. 예상 예산: ${budget}

12. 참고 영상 / 자료:
${references}

13. 문의 내용:
${details}
        `,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #00ff9d; border-bottom: 2px solid #00ff9d; padding-bottom: 10px;">미디어플레이트 제작 문의 내역</h2>
            
            <div style="margin-top: 20px;">
              <p><strong>1. 이름 / 담당자명:</strong> ${name}</p>
              <p><strong>2. 회사명 / 기관명:</strong> ${company}</p>
              <p><strong>3. 연락처:</strong> ${phone}</p>
              <p><strong>4. 이메일:</strong> ${email}</p>
            </div>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-top: 20px;">
              <p><strong>5. 제작하고자 하는 영상 종류:</strong> ${videoType}</p>
              <p><strong>6. 필요한 제작 범위:</strong> ${Array.isArray(scope) ? scope.join(", ") : scope}</p>
              <p><strong>7. 예상 영상 분량:</strong> ${length}</p>
              <p><strong>8. 제작 편수:</strong> ${episodes}</p>
              <p><strong>9. 촬영 필요 여부:</strong> ${filming}</p>
              <p><strong>10. 희망 제작 일정:</strong> ${schedule} (납품일: ${deliveryDate})</p>
              <p><strong>11. 예상 예산:</strong> ${budget}</p>
            </div>

            <div style="margin-top: 20px;">
              <p><strong>12. 참고 영상 / 자료:</strong></p>
              <p style="white-space: pre-wrap; background: #eee; padding: 10px; border-radius: 5px;">${references}</p>
            </div>

            <div style="margin-top: 20px;">
              <p><strong>13. 문의 내용:</strong></p>
              <p style="white-space: pre-wrap; background: #eee; padding: 10px; border-radius: 5px;">${details}</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; pt: 10px;">
              본 메일은 미디어플레이트 웹사이트 문의폼을 통해 자동 발송되었습니다.
            </p>
          </div>
        `
      };

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          await transporter.sendMail(mailOptions);
          res.status(200).json({ message: "Inquiry sent successfully" });
        } catch (mailError) {
          console.error("Transporter sendMail error:", mailError);
          res.status(500).json({ error: `이메일 전송 패스워드나 설정이 올바르지 않습니다: ${mailError instanceof Error ? mailError.message : 'Unknown error'}` });
        }
      } else {
        console.log("SMTP credentials missing. Email content would be:");
        console.log(mailOptions.text);
        res.status(200).json({ message: "Mock success - SMTP credentials missing in env" });
      }

    } catch (error) {
      console.error("Mail sending error:", error);
      res.status(500).json({ error: "Failed to send inquiry. Please try again later." });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
