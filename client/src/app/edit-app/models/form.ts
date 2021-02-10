export class Form {
    _id: number;
    name: string;
    description: string;
    form_active_status : string;
    theme: {
        bgColor: string;
        textColor: string;
        bannerImage: string
    }
    attributes: any
}

export class FormPaginationRsp {
    docs: Form[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}
