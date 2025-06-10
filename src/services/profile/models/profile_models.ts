import {DataTypes,Model} from "sequelize";
import database from "../../../shared/config/database_config";

//profile has the users firstname, lastname,phone,user_id

class Profile extends Model {
    declare id: string
    declare firstName: string
    declare lastName: string
    declare phone: string
    declare user_id: string
}

Profile.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        sequelize: database,
        modelName: "profile",
        timestamps: true,
        paranoid: true,
    }
)


//user_id linked with user model id
export  default Profile