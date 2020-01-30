export interface IAutoDeployProject{
    
        deployParameter : string,
         errorMessage : string,
         autoDeploy : {
             deployId : number,
             companyId : number,
             projectId : number,
             appId : number,
             envName :  string,
             clusterName :  string,
             repoName : string,
             imageName :  string,
             yamlFile : string,
             yamlPath : string
        },
         success : number
    
}