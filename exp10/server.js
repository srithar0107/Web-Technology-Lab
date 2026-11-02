
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Elite Architectural Firm</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f4f5f2;
                text-align: center;
                padding: 50px;
            }
            .container {
                background: white;
                padding: 35px;
                max-width: 650px;
                margin: auto;
                border-radius: 15px;
                box-shadow: 0 5px 20px #ccc;
            }
            h1 {
                color: #123047;
            }
            p {
                color: #555;
                font-size: 17px;
            }
            .highlight {
                color: #b58b43;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Elite Architectural Firm</h1>
            <p>Welcome to our architectural design studio!</p>
            <p>We create modern and innovative building designs.</p>
            <p>Request URL: <span class="highlight">${req.url}</span></p>
            <p>Request Method: <span class="highlight">${req.method}</span></p>
            <p>Server-side application developed using Node.js.</p>
        </div>
    </body>
    </html>
    `);
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
