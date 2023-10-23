const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Sds@123',
  database: 'kairos',
});

app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.log('Error fetching todos:', error);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.json(results);
    }
  });
});



// User registration endpoint
app.post('/api/register', (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    t1d_status,
    weight,
    address1,
    address2,
    city,
    state,
    zip,
    email,
    password,
  } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    // Insert user data into the "users" table
    pool.query(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, hashedPassword],
      (error, result) => {
        if (error) {
          console.error('Error creating user:', error);
          return res.status(500).json({ error: 'Server error' });
        }

        const userId = result.insertId;

        // Insert user details into the "user_details" table
        pool.query(
          'INSERT INTO user_details (user_id, first_name, last_name, date_of_birth, gender, t1d_status, address1, address2, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, first_name, last_name, date_of_birth, gender, t1d_status, weight, address1, address2, city, state, zip],
          (error) => {
            if (error) {
              console.error('Error creating user details:', error);
              return res.status(500).json({ error: 'Server error' });
            }

            res.json({ message: 'User registered successfully' });
          }
        );
      }
    );
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the "users" table
  pool.query(
    'SELECT user_id, email, password_hash FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'User not found' });
      }

      const user = results[0];

      // Compare the provided password with the hashed password from the database
      bcrypt.compare(password, user.password_hash, (err, passwordMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Server error' });
        }

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        // Password is valid, return a success message or user information
        res.json({ message: 'Login successful', user_id: user.user_id });
      });
    }
  );
});

// Retrieve user details by email
app.get('/api/user/:email', (req, res) => {
  const { email } = req.params;

  pool.query(
    'SELECT users.user_id, email, first_name, last_name, date_of_birth, gender, t1d_status, address1, address2, city, state, zip FROM users INNER JOIN user_details ON users.user_id = user_details.user_id WHERE users.email = ?',
    [email],
    (error, results) => {
      if (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = results[0];
      res.json(user);
    }
  );
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
