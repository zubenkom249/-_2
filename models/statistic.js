// models/statistic.js
module.exports = (mysqlDB, DataTypes, Player, Match) => {
  const Statistic = mysqlDB.define('Statistic', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    goals: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    assists: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    yellowCards: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Не додаємо playerId і matchId тут, вони будуть створені через асоціації
  });

  // Встановлюємо асоціації з явним визначенням зовнішніх ключів
  Statistic.belongsTo(Player, {
    foreignKey: {
      name: 'playerId',
      allowNull: true // Дозволяємо NULL для опціональних зв’язків
    }
  });
  Statistic.belongsTo(Match, {
    foreignKey: {
      name: 'matchId',
      allowNull: true
    }
  });

  return Statistic;
};