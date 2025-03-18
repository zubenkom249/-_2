
module.exports = (mysqlDB, DataTypes) => {
    const User = mysqlDB.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      }
    });
  
    // Хук для хешування пароля перед збереженням
    const bcrypt = require('bcryptjs');
    User.beforeCreate(async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });
  
    return User;
  };