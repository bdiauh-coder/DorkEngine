<div align="center">

<h1>
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=50&duration=2000&pause=1000&color=FF6B6B&center=true&vCenter=true&width=800&height=100&lines=DorkEngine+%F0%9F%94%8D;Google+Dork+Master;1000%2B+Pre-Built+Dorks;Security+Research+Tool" alt="Typing SVG" />
</h1>

<p align="center">
  <strong>The Ultimate Google Dorking Platform for Security Researchers & OSINT Professionals</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Dorks-1000+-FF6B6B?style=flat-square&logo=google&logoColor=white" alt="Dorks" />
  <img src="https://img.shields.io/badge/Categories-36-FF8E53?style=flat-square" alt="Categories" />
  <img src="https://img.shields.io/badge/Operators-30+-19FB9B?style=flat-square" alt="Operators" />
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square" alt="Made with Love" />
</p>

</div>

---

## 🚀 Features

<table>
<tr>
<td>

### 🎯 Core Features
- ✨ **1000+ Pre-Built Dorks** across 36 categories
- 🔧 **Advanced Custom Builder** with 30+ operators
- 📊 **Smart Search History** tracking
- 💾 **Multi-Format Export** (TXT, CSV, JSON)
- 🎨 **Beautiful Animated UI** with glassmorphism
- ⚡ **Lightning Fast** - optimized performance

</td>
<td>

### 🔐 Security Categories
- Admin & Login Panels
- Database Exposures
- Cloud Storage Leaks
- API & Endpoints
- Sensitive Documents
- CI/CD & DevOps Tools

</td>
</tr>
</table>

## ⚡ Quick Start

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/walterwhite-69/DorkEngine)

### Local Development

```bash
# Clone the repository
git clone https://github.com/walterwhite-69/DorkEngine.git
cd DorkEngine

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎓 Usage Examples

### 🔍 Using Pre-Built Dorks

1. Navigate to **Quick Dorks** tab
2. Select a category (e.g., "🔐 Admin & Login Panels")
3. Browse 1000+ ready-to-use dorks
4. Click "🔍 Search on Google" to execute

**Popular Dorks:**
```bash
inurl:admin intitle:login
site:s3.amazonaws.com filetype:pdf
filetype:sql "INSERT INTO" "VALUES"
intitle:"Index of /" +.htaccess
```

### 🛠️ Building Custom Dorks

1. Go to **Custom Builder** tab
2. Fill in parameters:
   - **Site/Domain:** `*.edu`
   - **In URL:** `portal`
   - **In Title:** `login`
   - **File Type:** `php`
3. Generated: `site:*.edu inurl:portal intitle:login filetype:php`
4. Click "🔍 Search with Custom Dork"

### 💡 Practical Examples

| Use Case | Dork Query |
|----------|------------|
| WordPress admin panels | `site:*.edu inurl:wp-admin intitle:login` |
| PDF research papers | `site:arxiv.org filetype:pdf machine learning` |
| Swagger API docs | `inurl:swagger.json OR inurl:api-docs.json` |
| GitHub config files | `site:github.com filename:.env DB_PASSWORD` |
| Database backups | `intitle:"Index of" filetype:sql "backup"` |
| Jenkins servers | `intitle:"Dashboard [Jenkins]" inurl:jenkins` |
| phpMyAdmin panels | `intitle:phpMyAdmin "Welcome to phpMyAdmin"` |
| AWS S3 buckets | `site:s3.amazonaws.com intitle:"Bucket listing"` |

### 🔥 Advanced Operators

**Combine multiple operators:**
```bash
site:gov filetype:pdf "confidential"
inurl:admin -demo -test intitle:login
site:edu filetype:xls "username" "password"
(admin | administrator) intitle:login site:gov
```

**Search with date ranges:**
```bash
before:2024-01-01 "data breach"
after:2023-01-01 site:github.com "api_key"
```

**Search specific domains:**
```bash
site:amazonaws.com intext:backup
site:(gov|edu) filetype:sql
```

## 📂 Dork Categories

<details>
<summary><b>🔐 Security & Access (4 categories)</b></summary>

- 🔐 Admin & Login Panels (52 dorks)
- 🔑 Credentials & Passwords (33 dorks)
- 🔑 SSH & Private Keys (26 dorks)
- 🖥️ Remote Access (20 dorks)

</details>

<details>
<summary><b>💾 Files & Data (4 categories)</b></summary>

- 💾 Exposed Files & Directories (70 dorks)
- 🗄️ Database Exposures (40 dorks)
- 📄 Sensitive Documents (40 dorks)
- 🔧 Log Files (24 dorks)

</details>

<details>
<summary><b>🖥️ Infrastructure (4 categories)</b></summary>

- 🖥️ Vulnerable Servers (24 dorks)
- 📹 Network Devices & Cameras (38 dorks)
- 📡 Network Equipment (27 dorks)
- 🔐 VPN & Network (24 dorks)

</details>

<details>
<summary><b>☁️ Cloud & DevOps (4 categories)</b></summary>

- ☁️ Cloud Storage (41 dorks)
- 🐙 Version Control (38 dorks)
- 🐳 Docker & Containers (24 dorks)
- 🔧 CI/CD & DevOps (29 dorks)

</details>

<details>
<summary><b>🌐 Web & Apps (4 categories)</b></summary>

- 🌐 Web Applications (23 dorks)
- 🔗 API & Endpoints (29 dorks)
- 📱 Mobile & Apps (22 dorks)
- 🔬 Development Tools (28 dorks)

</details>

<details>
<summary><b>💼 Communication & Enterprise (4 categories)</b></summary>

- 📧 Email & Communication (23 dorks)
- 💼 Enterprise Tools (27 dorks)
- 📞 Video Conferencing (16 dorks)
- 📝 Code & Snippets (22 dorks)

</details>

<details>
<summary><b>🎯 Specialized (12 categories)</b></summary>

- 💳 Payment & Financial (22 dorks)
- ⚠️ Error Messages (29 dorks)
- 📱 IoT Devices (21 dorks)
- 🔌 FTP & File Servers (19 dorks)
- 🗄️ Database Systems (26 dorks)
- 💰 Cryptocurrency (26 dorks)
- 📊 Analytics & Monitoring (25 dorks)
- 🌐 Content Management (21 dorks)
- 🎮 Gaming Servers (17 dorks)
- 🏥 Healthcare & Medical (19 dorks)
- 🏛️ Government & Education (24 dorks)
- 🎯 Custom Dork Builder

</details>

## 🎨 UI Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🌈 Animated Gradients | Beautiful flowing background animations |
| 🪟 Glassmorphism | Modern frosted glass design |
| ✨ Shimmer Effects | Eye-catching hover animations |
| 🎭 Smooth Transitions | Buttery smooth UI interactions |
| 📱 Fully Responsive | Perfect on all devices |
| ⚡ Optimized Performance | Pure CSS animations, no bloat |

</div>

## 🛡️ Tech Stack

```
Frontend:
├── Next.js 15        # React framework
├── TypeScript        # Type safety
├── React 18          # UI library
└── CSS3              # Animations & styling
```

## 💡 Pro Tips

| Tip | Example |
|-----|---------|
| ✅ Use quotes for exact phrases | `"error message"` |
| ✅ Combine operators for precision | `site:edu filetype:pdf intext:password` |
| ✅ Use wildcards for variations | `admin * panel` |
| ✅ Exclude terms with minus | `login -demo -test` |
| ✅ Group with parentheses | `(admin\|root) intitle:login` |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Disclaimer

> [!WARNING]
> This tool is for **educational and ethical security research purposes only**. Always obtain proper authorization before testing systems you don't own. Unauthorized access to computer systems is illegal.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### Made by Walter for Security Researchers & OSINT Professionals

<p>
  <a href="https://discord.gg/rgWcEw5G8a">
    <img src="https://img.shields.io/badge/Join%20Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" />
  </a>
</p>

</div>
