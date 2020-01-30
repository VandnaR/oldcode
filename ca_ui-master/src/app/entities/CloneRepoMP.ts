export interface ICloneRepoMarketplace{
    cloneRepoBean: {        
        imageName: string,
        sourceUrl: string,
        destinationUrl: string,
        username: string,
        password: string        
    },
    errorMessage: string
}