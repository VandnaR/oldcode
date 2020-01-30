export interface IDockerImageBean
{
    dockerImagesDTO: {
        imageId: number,
        ownerId: number,
        imageName: string,
        imageType: string,
        imageCategory: string,
        imageOS: string,
        imageArchitecture: string,
        imageVersion: string,
        imageDescription: string,
        imageURL: string,
        iconURL: string
        imagePullFlag: string,
        imagePullStatus: string,
        status: string,
        createdBy: string,
        createdOn: string,
        updatedBy: string,
        updatedOn: string
    },
    errorMessage: null
}