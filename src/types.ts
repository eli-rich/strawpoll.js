export interface PollData {
    title: string;
    answers: Array<string>;
    priv?: boolean;
    co?: boolean;
    ma?: boolean;
    mip?: boolean;
    enter_name?: boolean;
    deadline?: any;
    only_reg?: boolean;
    vpn?: boolean;
    captcha?: boolean;
    pin?: boolean;
}

export interface StrawpollClass {
    apiKey?: string;
    defaults: PollData;
    defaultPoll: PollData;
    get: (pollID: string) => Promise<PollResponse>;
    make: (poll: PollData) => Promise<MakeResponse>;
    delete: (pollID: string) => Promise<DeleteResponse>;
}

export interface PollInfo {
    is_points_eligible: number;
    is_votable: number;
    last_vote_at: string;
    original_title: any;
    poll_answers: Array<string>;
    poll_info: Object;
    private: number;
    reset_at: any;
    title: string;
    total_voters: number;
    total_votes: number;
}

export interface PollContent {
    comments: number;
    cookie_id: string;
    created_at: string;
    creator: any;
    deadline: any;
    has_webhooks: number;
    id: string;
    media: any;
    original_deadline: any;
    pin: any;
    poll: PollInfo;
    status: string;
    title: string;
    type: string;
}

export interface PollResponse {
    content: PollContent;
    success: number;
}

export interface MakeResponse {
    admin_key: string;
    content_id: string;
    success: number;
}

export interface DeleteResponse {
    message: string;
    success: number;
}
