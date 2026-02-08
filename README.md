<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zotzonr — Ecommerce Platform</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
            max-width: 900px;
        }
        h1, h2, h3 {
            color: #111;
        }
        code {
            background: #f4f4f4;
            padding: 4px 6px;
            border-radius: 4px;
        }
        pre {
            background: #f4f4f4;
            padding: 12px;
            border-radius: 6px;
            overflow-x: auto;
        }
        ul {
            margin-left: 20px;
        }
        .section {
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            padding: 6px 10px;
            background: #eee;
            border-radius: 6px;
            margin-right: 6px;
        }
    </style>
</head>

<body>

<h1>Zotzonr — Ecommerce Platform</h1>

<p>
Zotzonr is a modern ecommerce web application built with <strong>Laravel</strong>, 
<strong>Inertia.js</strong>, and <strong>React</strong>. It provides a seamless 
single-page application experience while leveraging Laravel’s powerful backend ecosystem.
</p>

<p>
🌐 Live Site: 
<a href="http://zotzonr.test/" target="_blank">http://zotzonr.test/</a>
</p>

<div class="section">
<h2>🚀 Tech Stack</h2>

<h3>Backend</h3>
<ul>
    <li>Laravel</li>
    <li>PHP</li>
    <li>MySQL / PostgreSQL</li>
    <li>RESTful architecture</li>
</ul>

<h3>Frontend</h3>
<ul>
    <li>React</li>
    <li>Inertia.js</li>
    <li>Tailwind CSS</li>
    <li>Axios</li>
</ul>

<h3>Architecture</h3>
<ul>
    <li>SPA experience without API complexity</li>
    <li>Server-driven routing via Laravel</li>
    <li>Component-based frontend</li>
</ul>
</div>

<div class="section">
<h2>✨ Features</h2>
<ul>
    <li>Product browsing and search</li>
    <li>Product details pages</li>
    <li>Shopping cart system</li>
    <li>User authentication</li>
    <li>Order management</li>
    <li>Admin product management</li>
    <li>Fast SPA navigation via Inertia</li>
    <li>Responsive UI</li>
</ul>
</div>

<div class="section">
<h2>📦 Installation</h2>

<h3>1. Clone Repository</h3>
<pre><code>git clone https://github.com/yourusername/zotzonr.git
cd zotzonr</code></pre>

<h3>2. Install Backend Dependencies</h3>
<pre><code>composer install</code></pre>

<h3>3. Install Frontend Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>4. Environment Setup</h3>
<pre><code>cp .env.example .env
php artisan key:generate</code></pre>

<p>Update <code>.env</code> with your database credentials.</p>

<h3>5. Run Migrations</h3>
<pre><code>php artisan migrate</code></pre>

<h3>6. Start Development Servers</h3>
<pre><code>php artisan serve
npm run dev</code></pre>

<p>Application will run at <code>http://127.0.0.1:8000</code></p>
</div>

<div class="section">
<h2>🗂 Project Structure</h2>
<pre><code>app/
resources/
 ├── js/
 │   ├── Pages/
 │   ├── Components/
 │   └── Layouts/
routes/
database/
public/</code></pre>

<ul>
    <li>Laravel handles routing and backend logic</li>
    <li>React handles UI rendering</li>
    <li>Inertia connects both</li>
</ul>
</div>

<div class="section">
<h2>🔐 Authentication</h2>
<ul>
    <li>User registration</li>
    <li>User login</li>
    <li>Profile management</li>
    <li>Order placement</li>
</ul>
</div>

<div class="section">
<h2>🧪 Development Commands</h2>
<pre><code>php artisan serve
npm run dev
npm run build
php artisan migrate</code></pre>
</div>

<div class="section">
<h2>🌍 Deployment</h2>
<ul>
    <li>Configure production .env</li>
    <li>Run <code>npm run build</code></li>
    <li>Set file permissions</li>
    <li>Configure web server (Nginx / Apache)</li>
    <li>Enable caching</li>
</ul>

<pre><code>php artisan config:cache
php artisan route:cache
php artisan view:cache</code></pre>
</div>

<div class="section">
<h2>🤝 Contributing</h2>
<ol>
    <li>Fork the repository</li>
    <li>Create a feature branch</li>
    <li>Commit changes</li>
    <li>Open a Pull Request</li>
</ol>
</div>

<div class="section">
<h2>📄 License</h2>
<p>This project is open-source and available under the MIT License.</p>
</div>

</body>
</html>
