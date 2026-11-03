<div align="center">
# Aman Dhakar — Portfolio
 
**Full-Stack Developer & Data Analyst**
 
A fast, responsive personal portfolio with a light/dark theme, smooth animations and a built-in AI assistant.
Built with plain HTML, CSS and JavaScript — nothing to install, nothing to build.
 
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-3D5BFF?style=flat-square)
![Theme](https://img.shields.io/badge/Theme-Light%20%7C%20Dark-0B0B14?style=flat-square)
 
[**Live Demo**](https://mramankirar.github.io/YOUR-REPO-NAME/) &nbsp;|&nbsp; [**Download CV**](pdf/Aman_Dhakar_CV.pdf) &nbsp;|&nbsp; [**Report an Issue**](../../issues)
 
<br>
<img src="screenshots/hero.png" alt="Portfolio home page" width="100%">
</div>
<br>
## At a Glance
 
| | |
|---|---|
| **What it is** | A single-page personal portfolio website |
| **Built with** | HTML5, CSS3, vanilla JavaScript (ES6+) |
| **Setup time** | Under a minute — open and run, no build step |
| **Hosting** | Any static host (GitHub Pages, Netlify, Vercel) |
| **Highlights** | Light/dark theme, project filters, certificate viewer, Myra AI assistant, working contact form |
 
## Contents
 
[Quick Start](#quick-start) · [Features](#features) · [Screenshots](#screenshots) · [Tech Stack](#tech-stack) · [Project Structure](#project-structure) · [Customize](#customize-it-for-yourself) · [Deploy](#deploy-for-free) · [Troubleshooting](#troubleshooting) · [Contributing](#contributing) · [License](#license) · [Contact](#contact)
 
---
 
## Quick Start
 
**1. Get the code**
 
```bash
git clone https://github.com/mramankirar/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```
 
**2. Start a local server** (choose one)
 
```bash
python -m http.server 8080      # Python
npx serve .                     # Node.js
```
 
Or open the folder in VS Code and click **Go Live** (Live Server extension).
 
**3. Open the site**
 
Visit **http://localhost:8080** in your browser. That's it.
 
> An internet connection is recommended on first load, as fonts and technology icons are loaded from Google Fonts and a CDN.
 
---
 
## Features
 
**Design & experience**
- Animated loading screen with progress indicator
- Light and dark themes, remembered between visits
- 3D tilt cards, magnetic buttons and scroll-reveal animations
- Animated sky background with stars, moon and shooting stars
- Fully responsive — mobile, tablet and desktop
**Content**
- **About** — professional summary and career goals
- **Skills** — grouped by Languages, Full-Stack, Databases, Data Analytics and Tools
- **Projects** — category filters and a detailed view with live demo and source links
- **Experience** — internship timeline with responsibilities and technologies
- **Credentials** — certificate gallery with filters and full-screen viewer
- **Journey** — education timeline
**Interactive**
- **Myra AI** — portfolio assistant that answers questions about skills, projects and experience in English or Hinglish, with optional voice support
- **Contact and feedback forms** — validated and delivered straight to email via Web3Forms
- **One-click CV download**
---
 
## Screenshots
 
<details open>
<summary><b>Home — Light and Dark</b></summary>
<br>
| Light | Dark |
|:---:|:---:|
| <img src="screenshots/hero.png" alt="Home, light theme"> | <img src="screenshots/hero-dark.png" alt="Home, dark theme"> |
 
</details>
<details>
<summary><b>About and Skills</b></summary>
<br>
| About | Skills |
|:---:|:---:|
| <img src="screenshots/about.png" alt="About section"> | <img src="screenshots/skills.png" alt="Skills section"> |
 
</details>
<details>
<summary><b>Projects and Experience</b></summary>
<br>
| Projects | Experience |
|:---:|:---:|
| <img src="screenshots/projects.png" alt="Projects section"> | <img src="screenshots/experience.png" alt="Experience section"> |
 
</details>
<details>
<summary><b>Credentials and Journey</b></summary>
<br>
| Credentials | Journey |
|:---:|:---:|
| <img src="screenshots/credentials.png" alt="Credentials section"> | <img src="screenshots/journey.png" alt="Journey timeline"> |
 
</details>
<details>
<summary><b>Contact</b></summary>
<br>
<img src="screenshots/contact.png" alt="Contact section" width="100%">
</details>
<details>
<summary><b>Mobile</b></summary>
<br>
<div align="center">
  <img src="screenshots/mobile.png" alt="Mobile layout" width="260">
</div>
</details>
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox, animations) |
| Scripting | Vanilla JavaScript (ES6+) |
| Typography | Bricolage Grotesque, Instrument Serif, Inter, JetBrains Mono |
| Icons | Devicon (CDN) and inline SVG |
| Forms | Web3Forms API |
| Tools | Git, GitHub, VS Code |
 
---
 
## Project Structure
 
<details>
<summary>Click to view the folder layout</summary>
```text
Aman_Portfolio/
├── index.html                    # Main page
├── profile.png                   # Hero profile photo
├── css/
│   ├── style.css                 # Global styles, themes, layout
│   └── myra-ai.css               # Myra AI widget styles
├── js/
│   ├── main.js                   # Projects, timeline, credentials data + core logic
│   ├── myra-ai.js                # Myra AI assistant
│   ├── theme-init.js             # Applies saved theme before first paint
│   ├── theme-toggle.js           # Light / dark switch
│   ├── smooth-scroll-animations.js
│   ├── experience-animations.js
│   ├── scroll-performance.js     # Pauses heavy effects while scrolling
│   ├── credential-lightbox.js    # Certificate viewer
│   ├── feedback-form.js          # Feedback form and validation
│   ├── mail-config.js            # Web3Forms configuration
│   ├── social-links.js
│   ├── photo-fallback.js         # Fallback if the profile photo is missing
│   └── fps-meter.js              # Optional FPS counter (add ?fps to the URL)
├── Image/
│   ├── credentials/              # Certificate images
│   └── projects/                 # Project thumbnails
├── pdf/
│   └── Aman_Dhakar_CV.pdf        # Downloadable resume
└── screenshots/                  # Images used in this README
```
 
</details>
---
 
## Customize It for Yourself
 
| I want to change... | Edit this |
|---|---|
| Projects, certificates, education timeline | `js/main.js` |
| Headline, about text, skills, experience | `index.html` |
| Colors, fonts, spacing | `css/style.css` |
| Myra AI answers and personal details | `js/myra-ai.js` |
| Profile photo | Replace `profile.png` |
| Resume | Replace `pdf/Aman_Dhakar_CV.pdf` |
 
<details>
<summary><b>How to add a new project</b></summary>
<br>
Add an object to the `projects` array in `js/main.js`:
 
```js
{
  title: "Project Name",
  desc: "A short description of what the project does.",
  img: "Image/projects/your-image.webp",
  cat: "Website",
  year: "2026",
  tags: ["HTML5", "CSS3", "JavaScript"],
  demo: "https://your-live-link.com",
  code: "https://github.com/your-username/your-repo"
}
```
 
</details>
<details>
<summary><b>How to enable the contact and feedback forms</b></summary>
<br>
1. Go to [web3forms.com](https://web3forms.com) and enter your email address.
2. Copy the **Access Key** they send you.
3. Paste it into `js/mail-config.js`:
```js
window.MAIL = {
  key: "YOUR_ACCESS_KEY",
  email: "you@example.com"
};
```
 
If no key is set, the forms open the visitor's email app instead of sending automatically.
For safety, restrict the key to your website's domain from the Web3Forms dashboard.
 
</details>
---
 
## Deploy for Free
 
**GitHub Pages**
 
1. Push the project to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then click **Save**.
5. After a minute, your site is live at `https://<username>.github.io/<repository-name>/`
> Make sure `index.html` is at the root of the repository, or select the folder that contains it.
 
**Alternatives:** Netlify, Vercel and Cloudflare Pages all work by importing the repository or dragging in the project folder.
 
---
 
## Troubleshooting
 
<details>
<summary><b>Images or styles are not loading after deployment</b></summary>
<br>
Check that the folder names match exactly, including capital letters. The image folder is named `Image` (capital I), and GitHub Pages is case-sensitive.
 
</details>
<details>
<summary><b>The profile photo is not showing</b></summary>
<br>
Make sure `profile.png` is in the same folder as `index.html`. If it is missing, the site falls back to showing your initials.
 
</details>
<details>
<summary><b>The contact form is not sending emails</b></summary>
<br>
Confirm your Web3Forms access key is set in `js/mail-config.js` and that your email address is verified on Web3Forms.
 
</details>
<details>
<summary><b>Fonts or technology icons look different</b></summary>
<br>
They load from Google Fonts and a CDN, so an internet connection is needed. Without it, the site uses fallback fonts and letter-based icons.
 
</details>
<details>
<summary><b>Voice features in Myra AI do not work</b></summary>
<br>
Voice depends on your browser's Web Speech API support. Use a recent version of Chrome or Edge for the best results.
 
</details>
---
 
## Contributing
 
Suggestions and improvements are welcome.
 
1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request
---
 
## License
 
Released under the **MIT License**. See the [LICENSE](LICENSE) file for details.
 
---
 
## Contact
 
**Aman Dhakar**
B.Tech Computer Science & Engineering, Institute of Technology & Management, Gwalior
 
[![GitHub](https://img.shields.io/badge/GitHub-mramankirar-181717?style=flat-square&logo=github)](https://github.com/mramankirar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-amandhakar1480-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/amandhakar1480/)
[![Email](https://img.shields.io/badge/Email-mramankirar@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:mramankirar@gmail.com)
 
<div align="center">
<sub>If you find this project useful, please consider giving it a star.</sub>
 
</div>
