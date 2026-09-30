# INSPRANO 2K26 — Official Tech Fest Platform & CMS
### Government College of Engineering Kalahandi, Bhawanipatna (GCEK)
**Theme**: *ENGINEERING BEYOND LIMITS*  
**Festival Dates**: 8 October 2026 – 10 October 2026  
**Official Prize Pool**: ₹85,000+ across 28 Verified Competitions

---

## 🚀 Overview

INSPRANO 2K26 is the production-ready full-stack digital portal and administrative content management system (CMS) built specifically for the national technical symposium of **Government College of Engineering Kalahandi (GCEK)**.

Designed with a high-octane **Transformers-inspired futuristic mechanical HUD interface**, the application delivers 3D WebGL particle telemetry, live real-time dynamic countdowns, holographic event cards, multi-device event previews, participant pass issuance, and complete CMS data control.

> **Zero Demo Data Policy**:  
> No dummy corporations, placeholder lorem ipsum, mock registrations, or fake individuals exist. The platform is pre-loaded with the **exact 28 official competitions and official cash prizes totaling ₹85,000**. Sections such as Leadership and Sponsors operate in elegant announcement states until populated by authorized college administrators.

---

## 🛠 Technology Architecture

### Frontend
- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS + Custom Cyberpunk / Mechanical Design Tokens
- **Animations**: Framer Motion & CSS Hardware Transforms
- **3D Telemetry**: Three.js WebGL Particle Vortex with Cursor Lerp Tracking
- **Icons**: Lucide React + Custom SVG collegiate insignia & mech emblems

### Backend & Database
- **REST API**: Next.js Server Route Handlers (`/api/*`)
- **Database**: MySQL 8.0 with connection pooling & prepared statements via `mysql2/promise`
- **Data Access Engine**: Dual-mode data layer with automatic connection management and resilient fallback store
- **Security**: JWT session tokens in secure HttpOnly cookies, BCrypt password hashing (12 rounds)
- **Auditing**: Comprehensive audit trail logging every admin mutation with user email, timestamp, and entity ID

---

## 📁 Repository Structure

```
insprano-2k26/
├── public/
│   ├── images/              # Official poster art and design blueprints
│   └── uploads/             # Administrator uploaded graphics & logos
├── scripts/
│   ├── schema.sql           # Production MySQL normalized database schema
│   ├── seed.sql             # Real official data: 28 events, prizes & 7 categories
│   ├── migrate.mjs          # Automated database schema migration runner
│   ├── seed.mjs             # Database seeding runner with prize verification
│   └── bootstrap-admin.mjs  # BCrypt-hashed Super Admin account initializer
├── src/
│   ├── app/
│   │   ├── api/             # REST APIs (events, registrations, auth, admin, etc.)
│   │   ├── admin/           # Secured Admin CMS dashboard & managers
│   │   ├── events/[slug]/   # Dynamic single event inspection page
│   │   ├── sponsors/        # Public sponsors showcase
│   │   ├── sponsorship/     # Public partnership proposal application
│   │   ├── leadership/      # Public leadership & patron council page
│   │   ├── schedule/        # Public 3-day timeline page
│   │   ├── rules/           # Public rules & code of conduct
│   │   ├── contact/         # Direct organizer messaging portal
│   │   ├── globals.css      # Cyber HUD & metallic typography styles
│   │   └── page.tsx         # Futuristic homepage with Hero & Command Center
│   ├── components/          # Reusable UI components (HUD navbar, modals, 3D canvas)
│   └── lib/
│       ├── db.ts            # Database client & connection pool
│       └── auth.ts          # JWT authentication, BCrypt & audit logger
├── .env.example             # Environment configuration template
├── package.json
└── tsconfig.json
```

---

## ⚙️ Quick Start & Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v22 tested)
- **npm**: v9.0.0 or higher
- **MySQL Server**: v8.0 or compatible (running on port 3306)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your database credentials and secrets are configured:
```env
DATABASE_URL="mysql://root:password@localhost:3306/insprano_2k26"
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="insprano_2k26"
DB_USER="root"
DB_PASSWORD="your_mysql_password"

JWT_SECRET="your_long_random_jwt_secret_key"
ADMIN_BOOTSTRAP_EMAIL="superadmin@gcekbpatna.ac.in"
ADMIN_BOOTSTRAP_PASSWORD="YourSecureAdminPassword!"
ADMIN_BOOTSTRAP_NAME="INSPRANO Chief Administrator"
```

### 4. Database Setup & Seeding
Run the automated migration and seed scripts:
```bash
# 1. Execute schema migrations
npm run db:migrate

# 2. Seed official 28 events and 7 categories (verified ₹85,000 prize total)
npm run db:seed

# 3. Bootstrap initial Super Admin account
npm run admin:bootstrap
```

### 5. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔐 Admin Panel Access

1. Open **[http://localhost:3000/admin/login](http://localhost:3000/admin/login)**
2. Sign in with your bootstrapped credentials:
   - **Email**: `superadmin@gcekbpatna.ac.in` (or configured `ADMIN_BOOTSTRAP_EMAIL`)
   - **Password**: Configured `ADMIN_BOOTSTRAP_PASSWORD`
3. Access full CMS control:
   - **Dashboard**: Real-time DB counts (Events, Registrations, Sponsors, Prize Pool)
   - **Events Manager**: Create, edit, duplicate, archive, and publish events with 3-device live preview
   - **Registrations Manager**: Search, filter by event/status, inspect squads, and export to CSV
   - **Sponsors Manager**: Manage partner logos and sponsorship tiers
   - **Leadership**: Appoint patron council and faculty coordinators
   - **Schedule**: Manage Day 1, Day 2, and Day 3 timeline items
   - **Gallery**: Upload photographs with caption and categories
   - **Audit Logs**: Inspect security logs with actor, entity ID, and timestamp

---

## 🌐 Public REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/command-center` | Real-time counts: total events, prize pool, open registration |
| `GET` | `/api/events` | List all events with category and keyword search |
| `GET` | `/api/events/:slug` | Detailed event specs, prizes, rules, coordinators |
| `GET` | `/api/categories` | Official 7 engineering domains |
| `GET` | `/api/schedule` | Day 1, 2, 3 scheduled timelines |
| `GET` | `/api/sponsors` | Published sponsors grouped by tier |
| `POST` | `/api/sponsorship` | Submit corporate partnership inquiry |
| `GET` | `/api/leadership` | Published leadership members |
| `GET` | `/api/gallery` | Published campus moments |
| `POST` | `/api/registrations` | Register participant/squad & generate pass code |
| `POST` | `/api/contact` | Submit contact message to organizers |
| `GET` | `/api/search` | Global search across events, categories & sponsors |
| `POST` | `/api/auth/login` | Authenticate admin user & set HttpOnly JWT cookie |
| `GET` | `/api/admin/dashboard` | Protected real-time admin telemetry |
| `GET` | `/api/admin/registrations/export` | Download full registrations ledger as CSV |

---

## 🚢 Production Deployment

### Option A: Vercel (Frontend) + Managed MySQL (Railway / AWS RDS / GCP)
1. Push repository to GitHub or GitLab.
2. In Vercel, import the project and configure environment variables from `.env.example`.
3. Set `DATABASE_URL` to your remote MySQL connection string (e.g. Railway or AWS RDS MySQL).
4. Run `npm run db:migrate && npm run db:seed` against the remote database.
5. Deploy!

### Option B: Docker / VPS Container Deployment
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🛡 Security & Audit Integrity
- **Password Protection**: Passwords are never stored in plaintext; hashed with bcrypt (salt rounds = 12).
- **Session Tokens**: JWT stored in `HttpOnly`, `SameSite=Lax`, secure cookies.
- **SQL Injection Prevention**: All queries use parameterized prepared statements.
- **Role Permissions**: `SUPER_ADMIN` (full system access), `ADMIN` (content & registrations), `EDITOR` (content only).
- **Audit Logging**: Any write mutation (event creation, sponsor addition, status change) writes an immutable record to the `audit_logs` table.

---

## 🏛 Institution
**Government College of Engineering Kalahandi, Bhawanipatna**  
Bandopala, Bhawanipatna, Kalahandi, Odisha — 766002  
Fest Portal: [https://insprano.gcekbpatna.ac.in](https://insprano.gcekbpatna.ac.in)
