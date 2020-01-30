export interface ISurveyResponseBean{
     surveyResponse: {
        surveyResponseId: number,
        appId: number,
        companyId: number,
        projectId: number,
        surveyId: number,
        userId: number,
        createdOn: string,
        createdBy: string,
        status: string
    },
    errorMessage: null
}
