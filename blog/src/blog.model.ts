export interface PostDto{
    title: string,
    content: string,
    name: string,
    updatedDt?: Date;
}

export interface Post{
    id: string;
    title: string;
    content: string;
    name: string;
    createdDt: Date;
    updatedDt?: Date;
}

