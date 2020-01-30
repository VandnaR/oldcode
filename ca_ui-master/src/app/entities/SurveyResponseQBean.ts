export interface ISurveyResponseQBean{
    surveyResponseQ : {
        surveyResponseQid: number,
        surveyResponseId: number,
        questionId: number,
        createdOn: string,
        submittedOn: string
    },
    errorMessage :string
}