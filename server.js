const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const mysqlDB = require('./mysql');

const Player = require('./models/player')(mysqlDB, DataTypes);
const Coach = require('./models/coach')(mysqlDB, DataTypes);
const Match = require('./models/match')(mysqlDB, DataTypes);
const Statistic = require('./models/statistic')(mysqlDB, DataTypes, Player, Match);
const User = require('./models/user')(mysqlDB, DataTypes);

// Встановлення асоціацій
Player.hasMany(Statistic);
Match.hasMany(Statistic);

const { register, login } = require('./authController');
const authMiddleware = require('./authMiddleware');
const adminMiddleware = require('./adminMiddleware');
const { registerValidation, loginValidation, validate } = require('./validation');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Реєстрація
app.post('/register', registerValidation, validate, register);

// Логін
app.post('/login', loginValidation, validate, login);

// Захищені роути
app.get('/players', authMiddleware, async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/players/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Player.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Гравця видалено' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mysqlDB.sync({ force: true }).then(() => {
  console.log('База даних синхронізована');
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});