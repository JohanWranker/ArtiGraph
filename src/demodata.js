import { DEFAULT_FONT } from "@gitgraph/core/lib/template"

export let root = "master"
export function branches() {
    return {
        "master": "1"
    }
}
let deliveries = {
    "master": [
        {
            "id": 4444,
            "reference": "2.12.3.4-g12313",
            "date": "2022-04-05 22:44:55",
            "is_geatest": false,
            "scrapped": false,
            "fork": "",
            "guid": "3456789-345678"
        },
        {
            "id": 4476,
            "reference": "2.12.3.5-g342545",
            "date": "2022-04-07 22:44:55",
            "is_geatest": false,
            "scrapped": false,
            "fork": "",
            "guid": "3456789-3456789-6226"
        },
        {
            "id": 4480,
            "reference": "2.12.3.6-g342545",
            "date": "2022-04-07 22:44:55",
            "is_geatest": true,
            "scrapped": false,
            "fork": "",
            "guid": "3456789-3456789-66444"
        },
        {
            "id": 4481,
            "reference": "2.12.3.7-g342545",
            "date": "2022-04-07 22:44:55",
            "is_geatest": false,
            "scrapped": true,
            "fork": "",
            "guid": "3456789-3456789-266"
        },
        {
            "id": 4482,
            "reference": "2.12.3.8-g342545",
            "date": "2022-04-07 22:44:55",
            "is_geatest": false,
            "scrapped": false,
            "fork": "",
            "guid": "3456789-3456789-626"
        },
        {
            "id": 4483,
            "reference": "2.12.3.9-g342545",
            "date": "2022-04-07 22:44:55",
            "is_geatest": false,
            "scrapped": false,
            "fork": "",
            "guid": "3456789-3456789-663"
        }
    ]
}


export class Tree {

    constructor() {
        this.lastBranch = []
        this.index = 0


    }

    GetRoot() {
        return root
    }

    GetNext(branch) {
        if (this.lastBranch != branch) {
            this.lastBranch = branch
            this.index = 0
        }
        else {
            this.index += 1
        }
        var s = deliveries[branch]
        if (deliveries[branch].length <= this.index) {
            return null
        }
        var item = deliveries[branch][this.index]
        var id = item["reference"]
        var onClick = () => { alert(`Commit ${item["guid"]} selected`) };

        var subject = item["reference"] ? item["reference"] : item["id"]

        subject += "     Delivered: " + item["date"]
        var dotText = item["is_geatest"] ? "❤️" : item["scrapped"] ? "💣" : ""

        var style = {
            "message": {
                "displayAuthor": false,
                "displayHash": false,

            }
        }
        if (item["scrapped"]) {
            style["message"]["color"] = "red"
        }
        var commit = {
            /*
            author?: string;
            subject?: string;
            body?: string;
            hash?: string;
            style?: TemplateOptions["commit"];
            dotText?: string;
            tag?: string;
            onClick?: (commit: Commit<TNode>) => void;
            onMessageClick?: (commit: Commit<TNode>) => void;
            onMouseOver?: (commit: Commit<TNode>) => void;
            onMouseOut?: (commit: Commit<TNode>) => void;
            */

            //"hash": item["guid"],
            "style": style,
            "dotText": item["is_geatest"] ? "❤️" : item["scrapped"] ? "💣" : "",
            "subject": subject,
            "onMessageClick": onClick,
            "onClick": onClick,
        }

        this.lastBranch = branch
        return commit
    }
}
