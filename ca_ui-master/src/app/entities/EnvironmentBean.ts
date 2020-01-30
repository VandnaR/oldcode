export interface IEnvironmentBean{    
        environment: {
        envId: number,
        companyId: number,
        projectId: number,
        envName: string,
        serviceProvider: string,
        username: string,
        password: string,
        jsonFile: string
    },
    errorMessage: string,
    success: number  
}