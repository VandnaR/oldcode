export interface IQuestion{
        questionId: number,
        dependsOnAnswerSelection: number,
        dependsOnQuestion: number,
        displayNumber: number,
        questionType: string,
        level: number,
        question:string,
        visible: string,
        answerType: string,
        category: string,
        ansLabelDisplayType: string,
        surveyId: number
}