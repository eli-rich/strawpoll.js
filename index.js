import axios from "axios";

class Strawpoll {
    constructor(apiKey = "", options = { }) {
        this.apiKey = apiKey; // https://strawpoll.com/en/api-docs/authentication/
        //this.callback = options.callback || false;
        this.default = {
            title: "",
            answers: [],
            priv: false, // is private poll?
            co: true, // Allow comments?
            ma: false, // Allow multiple answers?
            mip: false, // Allow multiple answers per IP?
            enter_name: false, // Still under development: https://strawpoll.com/en/api-docs/create-poll/
            deadline: undefined, // Datetime of deadline in zulu (UTC) time.
            only_reg: false, // Force voters to be registered?
            vpn: false, // Allow VPN users to vote?
            captcha: true, // Require captcha?
            pin: false // Generate pin for live poll?
        };
        this.defaultPoll = Object.assign({}, this.default, options);
        return this;
    }
    get(pollID = "") {
        let response = new Promise((resolve, reject) => {
            axios.get(`https://strawpoll.com/api/poll/${pollID}`, {headers: {"API-KEY": this.apiKey || ""}})
            .then(response => {
                if (response.hasOwnProperty("data") && response.data.hasOwnProperty("content")) {
                    return resolve(response.data.content);
                } else {
                    let error = new Error("Invalid ID or API KEY");
                    return reject(error);
                }
            })
            .catch(error => {
                return reject(error);
            });
        });
        return response;
    }
    make(poll = {}) {
        if (!poll.hasOwnProperty("title") || !poll.hasOwnProperty("answers")) {
            throw new Error("Invalid Poll Object.");
        }
        for (let property in poll) {
            if (!this.defaultPoll.hasOwnProperty(property)) throw new Error("Invalid Poll Object.");
        }
        for (let property in this.defaultPoll) {
            if (!poll.hasOwnProperty(property)) poll[property] = this.defaultPoll[property];
        }
        let response = new Promise((resolve, reject) => {
            let sendObj = {poll: poll};
            if (this.apiKey !== "") sendObj.headers = {"API-KEY": this.apiKey};
            else sendObj.headers = {};
            axios.post("https://strawpoll.com/api/poll", {
                poll: sendObj.poll,
                headers: sendObj.headers
            })
            .then(response => {
                return resolve(response.data);
            })
            .catch(error => {
                return reject(error);
            });
        });
        return response;
    }
    delete(pollID = "") {
        if (this.apiKey === "") throw new Error("This operation requires an API key.");
        let response = new Promise((resolve, reject) => {
            let sendObj = {content_id: pollID};
            if (this.apiKey !== "") sendObj.headers = {"API-KEY": this.apiKey};
            axios.delete("https://strawpoll.com/api/content/delete", {
                headers: sendObj.headers,
                data: { content_id: sendObj.content_id}
            })
            .then(response => resolve(response.data))
            .catch(error => reject(error));
        });
        return response;
    }
}

export default Strawpoll;