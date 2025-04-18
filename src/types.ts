export interface Question {
    questionId: string;
    question: string;
    questionType: string;
    answerType: string;
    options: string[];
    correctAnswer: string[];
  }
  
  export interface Data {
    status: string;
    data: {
      testId: string;
      questions: Question[];
    };
    message: string;
    activity: {
      id: string;
      userId: string;
      type: string;
      coinType: string;
      coins: number;
      description: string;
      createdAt: string;
    };
  }