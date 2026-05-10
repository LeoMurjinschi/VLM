import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Încarcă variabilele din .env
dotenv.config()

// Stocăm codurile de verificare în memorie: { email -> { code, expiresAt } }
const verificationCodes = new Map<string, { code: string; expiresAt: number }>()

// Configurarea transporterului Nodemailer cu Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function apiMockPlugin(): Plugin {
  return {
    name: 'api-mock-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {

        // ========================================================
        // POST /api/send-verification-code
        // Primește { email }, generează un cod, îl trimite pe mail
        // ========================================================
        if (req.url === '/api/send-verification-code' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', async () => {
            try {
              const { email } = JSON.parse(body);

              // Verifică dacă emailul există în users.json
              const mockPath = path.resolve(__dirname, 'src', '_mock', 'users.json');
              const users = JSON.parse(fs.readFileSync(mockPath, 'utf-8'));
              const userExists = users.find((u: any) => u.email === email);

              if (!userExists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'This email is not registered with FoodShare.' }));
                return;
              }

              // Generează cod de 6 caractere
              const code = Math.random().toString(36).substring(2, 8).toUpperCase();

              // Stochează codul în memorie (expiră în 10 minute)
              verificationCodes.set(email, {
                code,
                expiresAt: Date.now() + 10 * 60 * 1000,
              });

              // Trimite emailul real prin Gmail
              await transporter.sendMail({
                from: `"FoodShare" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: 'FoodShare — Password Reset Code',
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
                    <h2 style="color: #16a34a; margin-bottom: 16px;">FoodShare Password Reset</h2>
                    <p style="color: #374151; font-size: 15px;">You requested a password reset. Use the code below to verify your identity:</p>
                    <div style="background: #ffffff; border: 2px solid #16a34a; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
                      <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #16a34a;">${code}</span>
                    </div>
                    <p style="color: #6b7280; font-size: 13px;">This code expires in <strong>10 minutes</strong>.</p>
                    <p style="color: #6b7280; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
                    <p style="color: #9ca3af; font-size: 11px; text-align: center;">© FoodShare — Reducing food waste together</p>
                  </div>
                `,
              });

              console.log(`[EMAIL SENT] Verification code sent to ${email}`);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error('[EMAIL ERROR]', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to send verification email. Check server logs.' }));
            }
          });
          return;
        }

        // ========================================================
        // POST /api/verify-code
        // Primește { email, code }, verifică codul din memorie
        // ========================================================
        if (req.url === '/api/verify-code' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { email, code } = JSON.parse(body);

              const stored = verificationCodes.get(email);

              if (!stored) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'No verification code found. Please request a new one.' }));
                return;
              }

              if (Date.now() > stored.expiresAt) {
                verificationCodes.delete(email);
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Verification code has expired. Please request a new one.' }));
                return;
              }

              if (stored.code !== code) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid verification code. Please try again.' }));
                return;
              }

              // Cod valid — îl ștergem
              verificationCodes.delete(email);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error(err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
          });
          return;
        }

        // ========================================================
        // POST /api/reset-password  (existent deja — neschimbat)
        // ========================================================
        if (req.url === '/api/reset-password' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { email, password } = JSON.parse(body);
              const mockPath = path.resolve(__dirname, 'src', '_mock', 'users.json');
              const users = JSON.parse(fs.readFileSync(mockPath, 'utf-8'));

              const userIndex = users.findIndex((u: any) => u.email === email);
              if (userIndex !== -1) {
                users[userIndex].password = password;
                fs.writeFileSync(mockPath, JSON.stringify(users, null, 2), 'utf-8');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'User not found' }));
              }
            } catch (err) {
              console.error(err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiMockPlugin()],
})
