export interface IUser{
     user: {
        userId: number,        
        cell: string,
        companyEmail: string,
        createdBy: string,
        createdOn: string,
        emailValidatedFlag: string,
        fax: string,
        fullname: string,
        phone: string,
        updatedBy:string,
        updatedOn: string,
        username:string,
        companyId: number,
        password:string,
        roleId:number        
    },
    errorMessage: string;
}