import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from '../config/connectDB';

export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string; 
  image: string;
  phone?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public userName!: string;
  public password!: string;
  public image!: string;
  public phone?: string;

  static associate(models: any) {
    // Định nghĩa các mối quan hệ tại đây
    // User.belongsToMany(models.Project, {
    //   through: 'ProjectAssignments'
    // });
  }

  constructor(values?: UserAttributes, options?: BuildOptions) {
    super(values, options);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
