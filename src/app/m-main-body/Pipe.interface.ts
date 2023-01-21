export interface SinglePipe {
    id: number;
    title: string;
    author: string;
    description: string;
    likes: number;
    dislikes: number;
    url: string;
    tags: string[];
    comments: Comment[];
    date: string;
    module_ids: number[];
    impactFactor: number;
    isHidden: boolean;
    isDeleted: boolean;    
}
