import express from 'express';
import categoryService from './category.service';

class CategoryController {

    async listCategories(req: express.Request, res: express.Response) {
        const response = await categoryService.findAll(req);
        res.status(200).send(response);
    }
}

export default new CategoryController();