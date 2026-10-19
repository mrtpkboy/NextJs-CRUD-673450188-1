# nextjs-crud — ระบบจัดการนักศึกษา (Student CRUD)

โปรเจกต์ตัวอย่างระบบ **CRUD** (Create / Read / Update / Delete) สำหรับจัดการข้อมูลนักศึกษา
พัฒนาด้วย **Next.js (App Router) + TypeScript + Tailwind CSS + Prisma + SQLite**

อ้างอิงขั้นตอนจาก: https://it-nkc.github.io/nextjs-crud/

## เทคโนโลยีที่ใช้

| เทคโนโลยี | หน้าที่ |
|---|---|
| Node.js / npm | Runtime และตัวจัดการแพ็กเกจ |
| Next.js 16 | Framework (App Router, Server Actions) |
| Tailwind CSS 4 | จัดรูปแบบหน้าเว็บ |
| Prisma 7 | ORM สำหรับเชื่อมต่อฐานข้อมูล |
| SQLite (better-sqlite3) | ฐานข้อมูลแบบไฟล์ (`dev.db`) |

## ฟีเจอร์

- **Read** — แสดงรายชื่อนักศึกษาทั้งหมดในตาราง พร้อมจำนวนรวม
- **Create** — ฟอร์มเพิ่มนักศึกษาใหม่ (`/students/create`)
- **Update** — ฟอร์มแก้ไขข้อมูลนักศึกษา (`/students/[id]/edit`)
- **Delete** — ปุ่มลบพร้อมหน้าต่างยืนยัน

## โครงสร้างโปรเจกต์

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                 # redirect ไป /students
│   ├── lib/
│   │   └── prisma.ts            # Prisma Client + SQLite adapter
│   └── students/
│       ├── actions.ts           # Server Action: deleteStudent
│       ├── delete-button.tsx    # ปุ่มลบ (Client Component)
│       ├── page.tsx             # รายการนักศึกษา (Read)
│       ├── create/page.tsx      # ฟอร์มเพิ่ม (Create)
│       └── [id]/edit/page.tsx   # ฟอร์มแก้ไข (Update)
├── prisma/
│   └── schema.prisma            # โมเดล Student
├── prisma.config.ts
├── .env.example
└── package.json
```

## วิธีติดตั้ง

### 1. สิ่งที่ต้องมี

- [Node.js](https://nodejs.org/) เวอร์ชัน 20.9 ขึ้นไป (แนะนำ LTS ล่าสุด)
- Git

ตรวจสอบเวอร์ชัน:

```bash
node -v
npm -v
```

### 2. Clone โปรเจกต์

```bash
git clone https://github.com/mrtpkboy/NextJs-CRUD-673450188-1.git
cd NextJs-CRUD-673450188-1
```

### 3. ติดตั้ง dependencies

```bash
npm install
```

> คำสั่งนี้จะรัน `prisma generate` ให้อัตโนมัติ (สร้าง Prisma Client ไว้ที่ `app/generated/prisma/`)

### 4. ตั้งค่า Environment

คัดลอกไฟล์ตัวอย่างเป็น `.env`

macOS / Linux / Git Bash:

```bash
cp .env.example .env
```

Windows (Command Prompt):

```cmd
copy .env.example .env
```

ไฟล์ `.env` ต้องมีบรรทัดนี้:

```
DATABASE_URL="file:./dev.db"
```

### 5. สร้างฐานข้อมูล SQLite

```bash
npx prisma migrate dev --name create_student
```

จะได้ไฟล์ฐานข้อมูล `dev.db` และตาราง `Student`

### 6. รันโปรเจกต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ http://localhost:3000 (ระบบจะพาไปหน้า `/students` อัตโนมัติ)

## วิธีใช้งาน

| การทำงาน | วิธีใช้ |
|---|---|
| ดูรายชื่อนักศึกษา | เปิด http://localhost:3000/students |
| เพิ่มนักศึกษา | กดปุ่ม **เพิ่มนักศึกษา** → กรอกรหัสนักศึกษา, ชื่อ-นามสกุล, Email (ไม่บังคับ), สาขา, ชั้นปี (1–8) → กด **บันทึก** |
| แก้ไขข้อมูล | กดปุ่ม **แก้ไข** ท้ายแถวของนักศึกษา → แก้ข้อมูล → กด **บันทึกการแก้ไข** |
| ลบนักศึกษา | กดปุ่ม **ลบ** → กด OK ในหน้าต่างยืนยัน |

หมายเหตุ: **รหัสนักศึกษา** ต้องไม่ซ้ำกัน หากกรอกซ้ำระบบจะแจ้งข้อผิดพลาด

### ดูข้อมูลในฐานข้อมูลโดยตรง

```bash
npx prisma studio
```

หรือติดตั้ง Extension **SQLite Viewer** ใน VS Code แล้วเปิดไฟล์ `dev.db`

## Database Schema

```prisma
model Student {
  id          Int      @id @default(autoincrement())
  studentCode String   @unique
  name        String
  email       String?
  major       String
  year        Int
  status      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## คำสั่งที่ใช้บ่อย

| คำสั่ง | ความหมาย |
|---|---|
| `npm run dev` | รันโหมดพัฒนา |
| `npm run build` | Build สำหรับ production |
| `npm start` | รัน production server (ต้อง build ก่อน) |
| `npm run db:migrate` | สร้าง/อัปเดตตารางตาม schema |
| `npm run db:studio` | เปิด Prisma Studio |

## แก้ปัญหาเบื้องต้น

- **`Cannot find module '@/app/generated/prisma/client'`** → รัน `npx prisma generate`
- **`Environment variable not found: DATABASE_URL`** → ยังไม่ได้สร้างไฟล์ `.env` (ดูขั้นตอนที่ 4)
- **`no such table: Student`** → ยังไม่ได้ migrate รัน `npx prisma migrate dev --name create_student`
- **พอร์ต 3000 ถูกใช้งานอยู่** → รัน `npm run dev -- -p 3001`

## ผู้จัดทำ

- ชื่อ: _<ใส่ชื่อ-นามสกุล>_
- รหัสนักศึกษา: _<ใส่รหัสนักศึกษา>_
