import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from '../config/connectDB';

export interface CommentAttributes {
  id?: number
  user_id?: number
  post_id?: number
  comment: string
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: number;
  public user_id!: number
  public post_id!: number;
  public comment!: string;

  static associate(models: any) {
    // Định nghĩa các mối quan hệ tại đây
    // Comment.belongsToMany(models.Project, {
    //   through: 'ProjectAssignments'
    // });
  }

  constructor(values?: CommentAttributes, options?: BuildOptions) {
    super(values, options);
  }
}

Comment.init(
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
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);

export default Comment;
