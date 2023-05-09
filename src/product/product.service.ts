
import axios from 'axios';
import express from 'express';

class ProductService{

    endpoint = process.env.API_PATH;
    token = process.env.TOKEN;


    async findAll(req: express.Request) {
      
        console.log(this.endpoint);
        console.log('Request parameters: '+req);
        console.log(req.query);
        try{
            
            const params = req.query;
            const { data, status } = await axios.get<any>(
                this.endpoint+'catalog/products',
                {
                  headers: {
                    Accept: 'application/json',
                    'X-Auth-Token': this.token
                  },
                  params: params
                },
              );
              return data;
        
            }catch(error){

                if(axios.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    return error.message;
                } else {
                    console.log('unexpected error: ', error);
                    return 'An unexpected error occurred';
                }
        }
  
    };
}

export default new ProductService();