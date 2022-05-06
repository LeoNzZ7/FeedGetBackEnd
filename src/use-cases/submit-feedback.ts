import { MailAdapter } from '../adapters/mail-adapters';
import { FeedbacksRepository } from '../repositories/feedbacks-repositories'

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
} 

export class SubmitFeedbackUseCase {
   
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
        ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is requireed')
        }

        if (!comment) {
            throw new Error('comment is requireed')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('invalid screenshot format.')
        }
    
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div>`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : null,
                `</div>`,
            ].join('')
        })
    };
}