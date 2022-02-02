import { DeleteResponse, MakeResponse, PollData, PollResponse, StrawpollClass } from './types';
declare class Strawpoll implements StrawpollClass {
    apiKey: string;
    defaults: PollData;
    defaultPoll: PollData;
    constructor(apiKey?: string, options?: any);
    get(pollID?: string): Promise<PollResponse>;
    make(poll: PollData): Promise<MakeResponse>;
    delete(pollID?: string): Promise<DeleteResponse>;
}
export default Strawpoll;
