require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

// Verify db connection pool on start
pool.getConnection()
    .then(conn => {
        console.log("MySQL Connected successfully to pool");
        conn.release();
    })
    .catch(err => {
        console.error("Database Connection Failed:", err.message);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
