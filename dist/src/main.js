import axios from 'axios';
class Strawpoll {
    apiKey;
    defaults;
    defaultPoll;
    constructor(apiKey = '', options = {}) {
        this.apiKey = apiKey;
        this.defaults = {
            title: '',
            answers: [],
            priv: false,
            co: true,
            ma: false,
            mip: false,
            enter_name: false,
            deadline: undefined,
            only_reg: false,
            vpn: false,
            captcha: true,
            pin: false
        };
        this.defaultPoll = Object.assign({}, this.defaults, options);
        return this;
    }
    async get(pollID = '') {
        let response = await axios.get(`https://strawpoll.com/api/poll/${pollID}`, {
            headers: { 'API-KEY': this.apiKey || '' }
        });
        if (!response.hasOwnProperty('data') && response.data.hasOwnPropert('content')) {
            throw new Error('Invalid ID or API KEY');
        }
        else
            return response.data;
    }
    async make(poll) {
        if (!poll.hasOwnProperty('title') || !poll.hasOwnProperty('answers')) {
            throw new Error('Invalid Poll Object.');
        }
        for (let property in poll) {
            if (!this.defaultPoll.hasOwnProperty(property))
                throw new Error('Invalid Poll Object.');
        }
        Object.assign(this.defaultPoll, poll);
        let sendObj = { poll: poll, headers: {} };
        if (this.apiKey !== '')
            sendObj.headers = { 'API-KEY': this.apiKey };
        else
            sendObj.headers = {};
        let response = await axios.post('https://strawpoll.com/api/poll', {
            poll: sendObj.poll
        }, {
            headers: sendObj.headers
        });
        return response.data;
    }
    async delete(pollID = '') {
        if (this.apiKey === '')
            throw new Error('This operation requires an API key!');
        let sendObj = { data: {}, headers: {} };
        sendObj.headers = { 'API-KEY': this.apiKey };
        sendObj.data = { 'content_id': pollID };
        let response = await axios.delete('https://strawpoll.com/api/content/delete', sendObj);
        return response.data;
    }
}
export default Strawpoll;
