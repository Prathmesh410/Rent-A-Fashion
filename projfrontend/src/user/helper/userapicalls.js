import { API} from "../../backend";

export const getProductById =(productId) =>{
    return fetch(`${API}/product/${productId}`,{method:"GET"})
    .then(response =>{
        return response.json()

    })
    .catch(err=>console.log(err));
}



