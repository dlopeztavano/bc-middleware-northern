import express from 'express';
import productService from './product.service';

class ProductController {

    async listProducts(req: express.Request, res: express.Response) {
        const response = await productService.findAll(req);
        res.status(200).send(response);
    }

    async listProductsBySKU(req: express.Request, res: express.Response) {
        const response = await productService.findBySKU(req);
        res.status(200).send(response);
    }
}

export default new ProductController();