🛡️ War Spirit Web App
Një aplikacion uebi i ndërtuar me Next.js, Tailwind CSS dhe MongoDB, i dedikuar për të ndriçuar të vërtetat politike, duke lejuar përdoruesit të lexojnë postime blogu, të dërgojnë mesazhe kontakti dhe të menaxhojnë përmbajtjen përmes një paneli admin.

🚀 Demo Live
🔗 Kliko këtu për të parë aplikacionin live

🖼️ Pamje nga Ekrani
🔍 Faqja Kryesore e War Spirit
📬 Forma e Kontaktit e War Spirit
🛠️ Paneli Admin i War Spirit
⚙️ Udhëzime Instalimi
Klononi projektin:

git clone https://github.com/bujar5/projektijem.git
cd projektijem

Instaloni varësitë:

npm install

Konfiguroni .env.local:

Krijoni një skedar .env.local në rrënjën e projektit dhe shtoni:

MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority
NEXTAUTH_SECRET=yourSecretKey
NEXTAUTH_URL=http://localhost:3000

Startoni serverin lokal:

npm run dev

Vizitoni http://localhost:3000 në shfletuesin tuaj.

🧩 Teknologjitë e përdorura
✅ Next.js

✅ React

✅ TypeScript

✅ Tailwind CSS

✅ MongoDB & Mongoose

✅ NextAuth.js për autentikim

✅ REST API me Next.js API Routes

👥 Anëtarët e Grupit
Emri

Roli

Bujar Dema

Frontend, API, DB

Bujar Dema

UI Design, Auth

Bujar Dema

Dashboard, Admin tools

✅ Funksionalitetet Kryesore
📄 Lexo postime blogu që ndriçojnë të vërtetat politike

📨 Forma kontakti me validim dhe ruajtje në MongoDB

🔒 Autentikim i sigurt me NextAuth

🧑‍💼 Panel admin për menaxhimin e përmbajtjes dhe mesazheve

📂 Struktura e Projektit
/pages
  /api
    /auth
    /blogs
    /contact
  /dashboard
  /contact.tsx
  /index.tsx
/components
/lib
/public
.env.local

📬 Kontakt
Për çdo pyetje ose feedback, ju lutemi na kontaktoni në:
📧 hello@bujar.com
📞 +355 XX XXX XXXX
