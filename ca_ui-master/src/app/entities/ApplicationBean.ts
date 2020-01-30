export interface IApplicationBean{    
    application: {
        appId: number,
        appName: string,
        createdBy: string,
        createdOn: string,
        description: string,
        projectId: number
    },
    errorMessage: string
}
