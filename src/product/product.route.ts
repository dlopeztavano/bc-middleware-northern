
import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import productController from './product.controller';
import authConfig from '../auth/auth.config';


export class ProductRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'ProductRoutes');
    }

    configureRoutes() {
        this.app.route(`/products/all`)
            .get([authConfig.ensureToken, productController.listProducts])

        this.app.route(`/products`)
            .get([authConfig.ensureToken, productController.listProductsBySKU])
            
        return this.app;
    }

}

