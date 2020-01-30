export interface IClairReport{
    LayerCount:number,
    Vulnerabilities:{
        High:[{ 
            Name : string,
            NamespaceName : string,
            Description : string,
            Link : string,
            Severity : string,
            FixedBy : string,
            FeatureName : string,
            FeatureVersion : string
        }],
        Low:[{ 
            Name : string,
            NamespaceName : string,
            Description : string,
            Link : string,
            Severity : string,
            FixedBy : string,
            FeatureName : string,
            FeatureVersion : string
        }]
    }
}