export interface feedbackCreateDate {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRepository {
    create: (data: feedbackCreateDate) => Promise<void>;
}