export interface ISurveyResponseAnswersBean{
    surveyResponseAnswer: {
        id: {
                surveyResponseQid: number,
                answerOptionsId: number
            },
        createdOn: string,
        freeText: string,
        answerOption: number,
        surveyResponseId: number,
        appVersion: string
    },
    errorMessage :string
}
