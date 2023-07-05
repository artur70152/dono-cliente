module.exports = {
  up: (queryInterface, Sequelize)=> {
    
      return queryInterface.createTable('products', { 
        id: {
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
        },
      name:{
      type:Sequelize.STRING,
      allowNull:false,
      },
   
      quantity: {
        type: Sequelize.INTEGER, // 10 representa o número total de dígitos e 2 representa o número de casas decimais
        allowNull: false,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2), // 10 representa o número total de dígitos e 2 representa o número de casas decimais
        allowNull: false,
      },


      image: {
        type: Sequelize.BLOB('long'), // 'long' especifica que pode armazenar um grande volume de dados binários
        allowNull: false // Defina como true ou false, dependendo se a coluna permite valores nulos ou não
      },
      lucros: {
        type: Sequelize.DECIMAL(10, 2), // 10 representa o número total de dígitos e 2 representa o número de casas decimais
        allowNull: false,
      },
      
      created_at:{
      type:Sequelize.DATE,
      allowNull:false,
      },

      updated_at:{
      type:Sequelize.DATE,
      allowNull:false,
      },

     

      });
     
  },

 down: queryInterface=> {
    
    return queryInterface.dropTable('products');
    
  }
};
