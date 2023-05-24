import { NextFunction, Request, Response } from 'express';
import { BaseEntity, DeepPartial, Repository } from 'typeorm';

export abstract class CrudHelper<T extends BaseEntity> {
    constructor(protected repository: Repository<T>) { }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            next(err);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = Number(req.params.id);
        try {
            const entity = await this.repository.findOneById(id)
            res.json(entity);
        } catch (err) {
            next(err);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newEntity = this.repository.create(req.body as DeepPartial<T>);
            const entity = await this.repository.save(newEntity);
            res.status(201).json(entity);
        } catch (err) {
            next(err);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = Number(req.params.id);
        try {
            const entityToUpdate = await this.repository.findOneById(id);
            if (!entityToUpdate) {
                res.status(404).end();
                return;
            }

            const updatedEntity = this.repository.merge(entityToUpdate, req.body as DeepPartial<T>);
            const entity = await this.repository.save(updatedEntity);
            res.json(entity);
        } catch (err) {
            next(err);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = Number(req.params.id);
        try {
            const entityToDelete = await this.repository.findOneById(id);
            if (!entityToDelete) {
                res.status(404).end();
                return;
            }

            await this.repository.remove(entityToDelete);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }
}
