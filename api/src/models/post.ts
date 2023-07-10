import { BuildOptions, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connectDB';

export interface PostAttributes {
  id?: string,
  user_id: string,
  title: string,
  desc: string,
  date?: Date,
  image: string,
  content: string,
  type_post: string
}

class Post extends Model<PostAttributes> implements PostAttributes {
  public id!: string;
  public user_id!: string;
  public title!: string;
  public desc!: string;
  public date!: Date;
  public image!: string;
  public content!: string;
  public type_post!: string

  static associate(models: any) {
    // Định nghĩa các mối quan hệ tại đây
    // User.belongsToMany(models.Project, {
    //   through: 'ProjectAssignments'
    // })
  }

  constructor(values?: PostAttributes, options?: BuildOptions) {
    super(values, options);
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'User',
      //   key: 'id'
      // }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    type_post: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

export default Post;
