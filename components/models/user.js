let mongoose = require("mongoose");
mongoose.connect(process.env.mongo_connection);
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    points: {
        type:Number,
        default: 0
    }
}, {collection: 'users'});

let UserModel = mongoose.model('User', UserSchema);

let AssignToModel = function(user, ret){
    let cust = new UserModel({
        _id: mongoose.Types.ObjectId(),
        name: user.name
    });
    ret(cust);
}

let UpdateModel = function(user, query, ret){
    UserModel.findOneAndUpdate(query, {
        $inc: {
            points: user.points,
        }
    }, function(error, result){
        if(!error){
            ret({status: 200, data: result});
        }else{
            ret({status: 400, message: "Error updating the user"});
        }
    });
}

let AddUser = function(user, ret){
    UserModel.findOne({name: user.name}, function(error, result){
        if(!error){
            if(result == null){
                AssignToModel(user, function(result){
                    let user = result;
                    user.save(function(error){
                        if(error){
                            ret({status:  400, message: "There was an error saving the new user"});
                        }else{
                            ret({status: 200, message: "Thank you for joining us " + user.name});
                        }   
                    });
                });
            }else{
                ret({status: 200, message: "Welcome Back " + user.name + "!"});
            }
        }else{
            ret({message: "There was an error checking if that user already existed."});
        }
    })
}

let UpdateUser = function(user, ret){
    UpdateModel(user, {name: user.name}, function(result){
        if(result.data !== null){
            UserModel.findOne({name: user.name}, function(error, result){
                ret({message: "User " + user.name + " now has " + result.points + " points"});
            })
        }else{
            AddUser({name: user.name}, function(result){
                UpdateModel(user, {name: user.name}, function(result){
                    ret({message: "Added user: "+user.name+" and set points to "+user.points+"!"});
                })
            })
        }
    });
}

let RemoveUser = function(user, ret){
    UserModel.findOneAndRemove({name: user.name}, function(error, result){
        if(!error){
            if(result !== null){
                ret({message: "Sucessfully deleted user: " + user.name});
            }else{
                ret({message: "Could not find a user named: " + user.name});
            }
        }else{
            ret({message: "There was an issue deleting user: " + user.name});
        }
    })
}

let ResetPoints = function(ret){
    UserModel.updateMany({}, {$set: {points: 0}}, function(error, result){
        if(!error){
            ret({message: "All the points have been reset"});
        }else{
            ret({message: "There was an issue resetting the points"});
        }
    });
}

let GetUsers = function(ret){
    UserModel.find({}, function(error, result){
        if(!error){
            ret({data: result});
        }else{
            ret({error: "There was an issue with getting the users."});
        }
    })
}

let UserFunctions = {
    UserModel,
    AssignToModel,
    UpdateModel,
    AddUser,
    UpdateUser,
    RemoveUser,
    ResetPoints,
    GetUsers
}

module.exports = UserFunctions;