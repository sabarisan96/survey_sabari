export class User {
    _id: number;
    name: string;
    email: string;
    user_type_id: string;
    user_type_desc: string;
}

export class UserPaginationRsp {
    docs: User[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}
