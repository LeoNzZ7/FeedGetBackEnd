import express, { Request, Response } from 'express';
import { NodeMailerMailAdapter } from './adapters/nodeMailer/nodeMailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback';

export const routes = express.Router();

routes.post('/feedbacks', async (req: Request, res: Response) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbacksRepository();
    const nodeMailerAdapter = new NodeMailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodeMailerAdapter
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    });

    return res.status(201).send();
});