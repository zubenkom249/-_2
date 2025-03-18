module.exports = (mysqlDB, DataTypes) => {
    const Match = mysqlDB.define('Match', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      opponent: {
        type: DataTypes.STRING,
        allowNull: false
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Match;
  };