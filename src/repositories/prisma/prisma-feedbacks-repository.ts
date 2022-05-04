import { FeedbacksRepository, feedbackCreateDate } from "../feedbacks-repositories";
import { prisma } from "../../prisma";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({ type, comment, screenshot }: feedbackCreateDate) {
        await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    });  
    }
}