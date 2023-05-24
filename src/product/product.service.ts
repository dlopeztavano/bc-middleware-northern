
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
            const productIds:any = params['id:in'];


            const productArray = productIds.split(',');

            const size = 10; const arrayOfArrays = [];
            for (let i=0; i<productArray.length; i+=size) {
                arrayOfArrays.push(productArray.slice(i,i+size));
            }
      
            let results:any = {};
            results.data = [];

            for (let i=0; i<arrayOfArrays.length; i++) {
              
              const sliceOfProducts = arrayOfArrays[i].join(','); 
              params['id:in'] = sliceOfProducts;

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

             
              const arr = data.data;
              for (let j=0; j<arr.length; j++) {
                results.data.push(arr[j]);
              }
            }

            return results;


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

    async findBySKU(req: express.Request) {
      
      console.log('FindBySKU request parameters: '+req);
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