
import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import categoryController from './category.controller';
import authConfig from '../auth/auth.config';


export class CategoryRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'CategoriesRoutes');
    }

    configureRoutes() {
        this.app.route(`/categories/all`)
            .get([authConfig.ensureToken, categoryController.listCategories])
            
        return this.app;
    }

}

