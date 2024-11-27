const express = require("express");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { encrypt, decrypt } = require("./utils");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Encrypt Route
app.post("/encrypt", (req, res) => {
  const { value } = req.body;
  if (!value) {
    return res.status(400).json({ error: "Value is required for encryption." });
  }

  try {
    const encryptedValue = encrypt(value);
    res.status(200).json({ encryptedValue });
  } catch (error) {
    res.status(500).json({ error: "Encryption failed." });
  }
});

// Decrypt Route
app.post("/decrypt", (req, res) => {
  const { encryptedValue } = req.body;
  if (!encryptedValue) {
    return res
      .status(400)
      .json({ error: "Encrypted value is required for decryption." });
  }

  try {
    const decryptedValue = decrypt(encryptedValue);
    res.status(200).json({ decryptedValue });
  } catch (error) {
    res.status(400).json({
      error: "Decryption failed. Invalid input or encryption format.",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
