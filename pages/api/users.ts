import {NextApiRequest,NextApiResponse} from 'next'


export default(request:NextApiRequest,response:NextApiResponse)=>{
   const users = [
    {id:1,name:'Roberto'},
    {id:2,name:'MArcelo'},
    {id:3,name:'Bolinha'},
]

    return response.json(users)
}