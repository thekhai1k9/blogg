import { Sequelize } from "sequelize";


// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize('blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})


const connectDB =  async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default connectDB