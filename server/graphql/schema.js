const graphql = require('graphql');
const User = require('../models/user');
const Logo = require('../models/logo');
const LogoImage = require('../models/logoImage');
const LogoText = require('../models/logoText');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLList, 
    GraphQLSchema,
    GraphQLInt, 
    GraphQLID,
    GraphQLNonNull,
} = graphql;

// var user = [
//     {id: '1', email: 'endsider@gmail.com', password: 'nope'},
//     {id: '2', email: 'miner@gmail.com', password: 'hope'},
//     {id: '3', email: 'mystera@gmail.com', password: 'up'},
// ];

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        logos: {
            type: new GraphQLList(logoType),
            resolve(parent, args) {
                //console.log(Logo.find({creatorId: parent.id}));
                return Logo.find({creatorId: parent.id});
            }  
        },
        //createdLogos: {type: GraphQLList(logoType)}
    })
});

const logoType = new GraphQLObjectType({
    name: 'Logo',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        backgroundColor: {type: GraphQLString},
        borderColor: {type: GraphQLString},
        borderRadius: {type: GraphQLInt},
        borderWidth: {type: GraphQLInt},
        padding: {type: GraphQLInt},
        margins: {type: GraphQLInt},
        width: {type: GraphQLInt},
        height: {type: GraphQLInt},
        texts: {
            type: logoTextType,
            resolve(parent, args) {
                return LogoText.find({logoId: parent.id});
            }
        },
        images: {
            type: logoImageType,
            resolve(parent, args) {
                return LogoImage.find({logoId: parent.id});
            }
        },
        lastUpdate: {type: GraphQLString},
        creator: {
            type: userType,
            resolve(parent, args) {
                return User.findById(parent.creatorId);
            }
        },
        texts: {
            type: new GraphQLList(logoTextType),
            resolve(parent, args) {
                return LogoText.find({logoId: parent.id});
            }
        },
        images: {
            type: new GraphQLList(logoImageType),
            resolve(parent, args) {
                return LogoImage.find({logoId: parent.id});
            }
        }
    })
});

const logoImageType = new GraphQLObjectType({
    name: 'LogoImage',
    fields: () => ({
        _id: {type: GraphQLID},
        url: {type: GraphQLString},
        x: {type: GraphQLInt},
        y: {type: GraphQLInt},
        z: {type: GraphQLInt},
        type: {type: GraphQLString},
        width: {type: GraphQLInt},
        height: {type: GraphQLInt},
        logo: { //logo that this image is part of.
            type: logoType,
            resolve(parent, args) {
                return Logo.findById(parent.logoId);
            }
        },
    })
});

const logoTextType = new GraphQLObjectType({
    name: 'LogoText',
    fields: () => ({
        _id: {type: GraphQLID},
        x: {type: GraphQLInt},
        y: {type: GraphQLInt},
        z: {type: GraphQLInt},
        type: {type: GraphQLString},
        text: {type: GraphQLString},
        color: {type: GraphQLString},
        fontSize: {type: GraphQLInt},
        logo: { //logo that this image is part of.
            type: logoType,
            resolve(parent, args) {
                return Logo.findById(parent.logoId);
            }
        },
    })
});


const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        userById: {
            type: userType,
            args: { id: { type: new GraphQLNonNull(GraphQLID)} },
            resolve(parent, args) {
                return User.findById(args.id).then(user => {
                    if(user)
                        return user;
                    else 
                        throw new Error('User with id does not exist.');
                }); //get user based on id.
            }
        },
        userByEmail: {
            type: userType,
            args: { email: { type: new GraphQLNonNull(GraphQLString)} },
            resolve(parent, args) {
                return User.find({email: args.email}).then(user => {
                    if(user.length > 0)
                        return user[0];
                    else
                        throw new Error('User with email does not exist.');
                }); //get user based on id.
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return User.find({});// find all users.
            }
        },
        logo: {
            type: logoType,
            args: { id: { type: new GraphQLNonNull(GraphQLID)} },
            resolve(parent, args) {
                return Logo.findById(args.id); //get logo based on passed in Id.
            }
        },
        logos: {
            type: new GraphQLList(logoType),
            resolve(parent, args) {
                return Logo.find({}).sort({lastUpdate: -1}); // find all logos by passing in empty object.
            }
        },
        logoTexts: {
            type: new GraphQLList(logoTextType),
            args: { id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args) {
                return LogoText.find({logoId: args.id});
            }
        },
        logoImages: {
            type: new GraphQLList(logoImageType),
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args) {
                return LogoImage.find({logoId: args.id});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                return User.find({email: args.email}).then(user => {
                    //console.log(user.length);
                    if(user.length > 0)
                        throw new Error('Email taken');
                    else
                    {
                        let newUser = new User({
                            email: args.email,
                            password: args.password
                        });
                        return newUser.save();
                    }
                });
            }
        },
        addLogo: {
            type: logoType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                creatorId: {type: new GraphQLNonNull(GraphQLID)},
                backgroundColor: {type: new GraphQLNonNull(GraphQLString)},
                borderColor: {type: new GraphQLNonNull(GraphQLString)},
                borderRadius: {type: new GraphQLNonNull(GraphQLInt)},
                borderWidth: {type: new GraphQLNonNull(GraphQLInt)},
                padding: {type: new GraphQLNonNull(GraphQLInt)},
                margins: {type: new GraphQLNonNull(GraphQLInt)},
                width: {type: new GraphQLNonNull(GraphQLInt)},
                height: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let logo = new Logo({
                    name: args.name,
                    creatorId: args.creatorId,
                    backgroundColor: args.backgroundColor,
                    borderColor: args.borderColor,
                    borderRadius: args.borderRadius,
                    borderWidth: args.borderWidth,
                    padding: args.padding,
                    margins: args.margins,
                    width: args.width,
                    height: args.height,
                    lastUpdate: new Date().toISOString(),
                });
                return logo.save();
            }
        },
        addLogoText: {
            type: logoTextType,
            args: {
                x: {type: new GraphQLNonNull(GraphQLInt)},
                y: {type: new GraphQLNonNull(GraphQLInt)},
                z: {type: new GraphQLNonNull(GraphQLInt)},
                text: {type: new GraphQLNonNull(GraphQLString)},
                color: {type: new GraphQLNonNull(GraphQLString)},
                fontSize: {type: new GraphQLNonNull(GraphQLInt)},
                logoId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Logo.findById(args.logoId).then(logo => {
                    if(!logo)
                        throw new Error('Logo with id does not exist.');
                    else
                    {
                        let logoText = new LogoText({
                            x: args.x,
                            y: args.y,
                            z: args.z,
                            type: "text",
                            text: args.text,
                            color: args.color,
                            fontSize: args.fontSize,
                            logoId: args.logoId,
                        });
                        return logoText.save();
                    }
                }).then(logoText => {
                    //console.log(logoText.logoId);
                    return Logo.findByIdAndUpdate(logoText.logoId, {lastUpdate: new Date().toISOString()}).then(() => {
                        return logoText;
                    });
                });
            }
        },
        addLogoImage: {
            type: logoImageType,
            args: {
                url: {type: new GraphQLNonNull(GraphQLString)},
                x: {type: new GraphQLNonNull(GraphQLInt)},
                y: {type: new GraphQLNonNull(GraphQLInt)},
                z: {type: new GraphQLNonNull(GraphQLInt)},
                width: {type: new GraphQLNonNull(GraphQLInt)},
                height: {type: new GraphQLNonNull(GraphQLInt)},
                logoId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Logo.findById(args.logoId).then(logo => {
                    if(!logo)
                        throw new Error('Logo with id does not exist.');
                    else
                    {
                        let logoImage = new LogoImage({
                            url: args.url,
                            x: args.x,
                            y: args.y,
                            z: args.z,
                            type: "image",
                            width: args.width,
                            height: args.height,
                            logoId: args.logoId,
                        });
                        return logoImage.save();
                    }
                }).then(logoImage => {
                    return Logo.findByIdAndUpdate(logoImage.logoId, {lastUpdate: new Date().toISOString()}).then(() => {
                        return logoImage;
                    });
                });
            }
        },
        updateUser: {
            type: userType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                //TODO: Check to see if new email exists.
                //TODO: Hash the password.
                return User.findByIdAndUpdate(args.id, {
                    email: args.email,
                    password: args.password
                });
            }
        },
        updateLogo: {
            type: logoType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                creatorId: {type: GraphQLID},
                backgroundColor: {type: GraphQLString},
                borderColor: {type: GraphQLString},
                borderRadius: {type: GraphQLInt},
                borderWidth: {type: GraphQLInt},
                padding: {type: GraphQLInt},
                margins: {type: GraphQLInt},
                width: {type: GraphQLInt},
                height: {type: GraphQLInt}
            },
            resolve(parent, args)
            {
                return Logo.findById(args.id).then(logo => {
                    return Logo.findByIdAndUpdate(args.id, {
                        name: args.name? args.name: logo.name,
                        creatorId: args.creatorId? args.creatorId: logo.creatorId,
                        backgroundColor: args.backgroundColor? args.backgroundColor: logo.backgroundColor,
                        borderColor: args.borderColor? args.borderColor:logo.borderColor,
                        borderRadius: args.borderRadius? args.borderRadius: logo.borderRadius,
                        borderWidth: args.borderWidth? args.borderWidth: logo.borderWidth,
                        padding: args.padding? args.padding: logo.padding,
                        margins: args.margins? args.margins: logo.margins,
                        width: args.width? args.width: logo.width,
                        height: args.height? args.height: logo.height,
                        lastUpdate: new Date().toISOString(),
                    });
                });
            }
        },
        updateLogoText: {
            type: logoTextType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                x: {type: GraphQLInt},
                y: {type: GraphQLInt},
                z: {type: GraphQLInt},
                text: {type: GraphQLString},
                color: {type: GraphQLString},
                fontSize: {type: GraphQLInt},
                logoId: {type: GraphQLID},
            },
            resolve(parent, args) {
                return LogoText.findById(args.id).then(logoText => {
                    return LogoText.findByIdAndUpdate(args.id, {
                        x: args.x? args.x: logoText.x,
                        y: args.y? args.y: logoText.y,
                        z: args.z? args.z: logoText.z,
                        text: args.text? args.text: logoText.text,
                        color: args.color? args.color: logoText.color,
                        fontSize: args.fontSize? args.fontSize: logoText.fontSize,
                        logoId: args.logoId? args.logoId: logoText.logoId,
                    }).then(logoText => {
                        //console.log(logoText.logoId);
                        return Logo.findByIdAndUpdate(logoText.logoId, {lastUpdate: new Date().toISOString()}).then(() => {
                            return logoText;
                        });
                    });
                });
                
            }
        },
        updateLogoImage: {
            type: logoImageType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                url: {type: GraphQLString},
                x: {type: GraphQLInt},
                y: {type: GraphQLInt},
                z: {type: GraphQLInt},
                width: {type: GraphQLInt},
                height: {type: GraphQLInt},
                logoId: {type: GraphQLID},
            },
            resolve(parent, args) {
                return LogoImage.findById(args.id).then(logoImage => {
                    return LogoImage.findByIdAndUpdate(args.id, {
                        url: args.url? args.url: logoImage.url,
                        x: args.x? args.x: logoImage.x,
                        y: args.y? args.y: logoImage.y,
                        z: args.z? args.z: logoImage.z,
                        width: args.width? args.width: logoImage.width,
                        height: args.height? args.height: logoImage.height,
                        logoId: args.logoId? args.logoId: logoImage.logoId,
                    }).then(logoImage => {
                        return Logo.findByIdAndUpdate(logoImage.logoId, {lastUpdate: new Date().toISOString()}).then(() => {
                            return logoImage;
                        });
                    });
                });
                
            }
        },
        deleteUser: {
            type: userType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return User.findByIdAndDelete(args.id);
            }
        },
        deleteLogo: {
            type: logoType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return Logo.findByIdAndDelete(args.id).then(logo => {
                    if(!logo)
                        throw new Error('Logo with id does not exist.');
                    else
                    {
                        LogoImage.deleteMany({logoId: logo.id});
                        LogoText.deleteMany({logoId: logo.id});
                        return logo;
                    }
                });
            }
        },
        deleteLogoText: {
            type: logoTextType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return LogoText.findByIdAndDelete(args.id);
            }
        },
        deleteLogoImage: {
            type: logoImageType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return LogoImage.findByIdAndDelete(args.id);
            }
        },
    }
});


module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation,
});