import "dotenv/config"
import "reflect-metadata";
import express from "express"
import { ApolloServer } from "apollo-server-express";
import {buildSchema} from "type-graphql"
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";



(async()=>{
    const app = express();
    app.get("/", (_,res)=>{
        res.send("Hello world")
    })
    app.post("/refresh_token",(req)=>{
        console.log(req.headers)
    })

    await createConnection();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[UserResolver]
        }),
        context: ({res,req})=>({res, req})
        
    })
    apolloServer.applyMiddleware({app})

    app.listen(4000,()=>{
        console.log("App started")
    })

})()


// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));

