export interface youtube {
    title: string;
    link: string;
    note: string;
    rangeStart: number;
    rangeEnd: number;
}


export interface blog {
    title: string;
    link: string;
    note: string;
}

export interface course {
    title: string;
    link: string;
    note: string;
    isPaid: boolean;
    price: number;
}

export interface live {
    title: string;
    link: string;
    note: string;
}

export interface pipeModules {
    youtube: youtube[];
    blog: blog[];
    course: course[];
    live: live[];
}