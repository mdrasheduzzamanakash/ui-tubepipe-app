export interface youtube {
    title: string;
    link: string;
    note: string;
    rangeStart: number;
    rangeEnd: number;
    sequence: number;
    category: string;
    m_id: string;
    isCompleted: boolean;
    mongo_id: string;
}


export interface blog {
    title: string;
    link: string;
    note: string;
    sequence: number;
    category: string;
    m_id: string;
    isCompleted: boolean;
    mongo_id: string;
}

export interface course {
    title: string;
    link: string;
    note: string;
    isPaid: boolean;
    price: number;
    sequence: number;
    category: string;
    m_id: string;
    isCompleted: boolean;
    mongo_id: string;
}

export interface live {
    title: string;
    link: string;
    note: string;
    sequence: number;
    category: string;
    m_id: string;
    isCompleted: boolean;
    mongo_id: string;
}

export interface pipeModules {
    youtube: youtube[];
    blog: blog[];
    course: course[];
    live: live[];
    upload: any[];
}