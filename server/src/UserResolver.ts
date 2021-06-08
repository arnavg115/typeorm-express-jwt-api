import {Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware} from "type-graphql"
import { User } from "./entity/User"
import {hash, compare} from "bcryptjs"

import { MyContext } from "./MyContext"
import { createAccessToken, createRefreshToken } from "./auth"
import { isAuth } from "./isAuth"


@ObjectType()
class LoginResponse {
    @Field()
    accessToken:string
}


@Resolver()
export  class UserResolver{
    @Query(()=> String)
    hello(){
        return "hi!"
    }
    @Query(()=>String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() {payload}:MyContext
    ){
        return `your user id is ${payload?.userId}`
    }

    @Query(()=> [User])
    users(){
        return User.find()
    }

    @Mutation( ()=> Boolean)
    async register(
        @Arg('email') email: string, 
        @Arg('password') password:string
    ){
        const hashed = await hash(password, 12)
        try{
            await User.insert({
                email,
                password: hashed
            })
            return true
        }
        catch (err){
            console.log(err)
            return false
        }

    }
    @Mutation( ()=> LoginResponse)
    async login(
        @Arg('email') email: string, 
        @Arg('password') password:string,
        @Ctx() {res}: MyContext
    ):Promise<LoginResponse>{
        const user = await User.findOne( {where: {email}} )

        if(!user){
            throw new Error('user not found')
        }

        const valid = await compare(password, user.password)

        if(! valid){
            throw new Error("incorrect password")
        }
        res.cookie('jid',createRefreshToken(user) ,{httpOnly:true})


        return {
            accessToken:createAccessToken(user)
        }

    }

}