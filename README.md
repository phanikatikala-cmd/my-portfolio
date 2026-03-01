# My Portfolio

Static portfolio site for Ram Katikala.

## Contents
- `index.html`, `style.css`, `index.js` — site source

## Build & run with Docker

Build the image:

```bash
docker build -t ram-katikala-portfolio:latest .
```

Run the container:

```bash
docker run --rm -p 8080:80 ram-katikala-portfolio:latest
```

Open http://localhost:8080 in your browser.

## Run locally (no Docker)

Serve with Python 3 from the project root:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Git

Repository remote: https://github.com/phanikatikala-cmd/my-portfolio.git (branch `my-protofilo`)

Commit and push any changes:

```bash
git add .
git commit -m "Describe changes"
git push
```

---

Replace placeholder project links in `index.html` with real repo/demo URLs as needed.
