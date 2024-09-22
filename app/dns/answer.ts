import {DNSClassCodes, DNSQuestionType} from "./question"

export interface _DNSAnswer{
    name : string;
    type : DNSQuestionType;
    className : DNSClassCodes;
    ttl:number;
    data:string
}

export class Answer{
    static write(answers: _DNSAnswer[]) {
        return Buffer.concat(
            answers.map(answer=>{
                const {name,type,className,ttl,data} = answer;
                const buffer = Buffer.alloc(10);
                const str = name.split(".").map(elem=> `${String.fromCharCode(elem.length)}${elem}`).join("");
                buffer.writeInt16BE(type);
                buffer.writeInt16BE(className, 2);
                buffer.writeInt16BE(ttl, 4);
                buffer.writeInt16BE(data.length, 8);

                return Buffer.concat([Buffer.from(str + "\0", "binary"), buffer, Buffer.from(data + "\0", "binary")])
            })
        )
    }
}