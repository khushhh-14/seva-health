const bcrypt = require('bcryptjs');
const mysql  = require('mysql2/promise');
require('dotenv').config();

const doctors = [
            { name: 'Dr. Khush', username: 'khush',   password: 'khush123'},
            { name: 'Dr. Hitansh', username: 'hitansh',   password: 'hitansh123'},
            { name: 'Dr. Shlok', username: 'shlok',   password: 'shlok123'},
            { name: 'Dr. Nilansh', username: 'nilansh',   password: 'nilansh123'},
            { name: 'Dr. Pratiksha', username: 'pratiksha',   password: 'pratiksha123'   },
            
        ];

async function seed() {
    const db = await mysql.createConnection({
        host:     process.env.DB_HOST,
        user:     process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    for (const doc of doctors) {
        const hash = await bcrypt.hash(doc.password, 10);
        await db.execute(
            `INSERT IGNORE INTO doctors (name, username, password_hash) VALUES (?, ?, ?)`,
            [doc.name, doc.username, hash]
        );
        console.log(`Inserted: ${doc.username}`);
    }

    console.log('All doctors seeded successfully.');
    await db.end();
}

seed().catch(console.error);
