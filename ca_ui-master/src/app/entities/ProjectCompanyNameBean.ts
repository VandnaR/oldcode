export interface IProjectCompanyNameBean{
    project: {
        projectId: number,
        createdBy: string,
        createdOn: string,
        projectName: string,
        companyId: number
    },
    companyName: string,
    errorMessage:string
    
}