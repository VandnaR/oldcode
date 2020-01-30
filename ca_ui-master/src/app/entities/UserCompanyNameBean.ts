export interface IUserCompanyNameBean{
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
        password:string
    },
    companyName:string,
    role:string,
    errorMessage: string;
}