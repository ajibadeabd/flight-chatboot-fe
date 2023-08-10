import axios from "axios"

let instance = axios.create({
    baseURL:"http://127.0.0.1:8000/"
})

export const flightData = async ()=>{

    try{
    return await  instance.get("api/flights?limit=20")


    }catch(error){

    }
}


export const bookFlight = async (data)=>{

    try{
    return await  instance.post("api/booking",data)
    }catch(error){
    }
}


export const getPaymentLink = async (id)=>{

    try{
    return await  instance.get("api/initialize_payment/"+id)
    }catch(error){
    }
}