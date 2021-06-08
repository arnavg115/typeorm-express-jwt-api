import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router';
import { useLoginMutation } from '../generated/graphql';

interface Props {

}
export const Login: FC<RouteComponentProps> = ({history})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    return(
        <div>
            <form onSubmit={async e=>{
                e.preventDefault()
                console.log("form submitted")
                let resp;
                try{
                resp = await login({
                    variables:{
                        email,
                        password
                    }
                })
            }
            catch(err){
                console.log(err)
            }
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
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    );
}