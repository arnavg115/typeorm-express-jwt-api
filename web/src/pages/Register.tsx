import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router';
import {useRegisterMutation} from "../generated/graphql"

export const Register: FC<RouteComponentProps> = ({history})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register] = useRegisterMutation();
    return(
        <div>
            <form onSubmit={async e=>{
                e.preventDefault()
                console.log("form submitted")
                const resp = await register({
                    variables:{
                        email,
                        password
                    }
                })
                history.push("/")
                console.log(resp)

            }}>
                <div>
                    <input value={email} placeholder="email" onChange={e=>{
                        setEmail(e.target.value)
                    }}/>
                    <input value={password} type="password" placeholder="password" onChange={e=>{
                        setPassword(e.target.value)
                    }}/>
                    <button type="submit">register</button>
                </div>
            </form>
        </div>
    );
}