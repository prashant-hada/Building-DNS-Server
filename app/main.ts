import * as dgram from "dgram";
import { TDNSHeader , DNSHeader, OpCode, ResponseCode } from "./dns/header";
import { Question , _DNSQuestion, DNSClassCodes, DNSQuestionType} from "./dns/question";
import { _DNSAnswer, Answer } from "./dns/answer";

const defaultHeader : TDNSHeader = {
    id: 1234,
    qr: 1 << 15,
    opCode: OpCode.STANDARD_QUERY,
    aa:  0,
    tc: 0,
    rd: 0,
    ra: 0,
    z: 0,
    rCode : ResponseCode.NO_ERROR,
    qdCount : 0,
    anCount : 0,
    nsCount : 0,
    arCount : 0
} 

const defaultQuestion : _DNSQuestion ={
    name : "codecrafters.io",
    classCode : DNSClassCodes.IN,
    type : DNSQuestionType.A
}

const defaultAnswer: _DNSAnswer ={
    name : "codecrafters.io",
    className : DNSClassCodes.IN,
    type : DNSQuestionType.A,
    ttl:60,
    data: "\x02.\x02.\x04.\x05"
}


// Uncomment this block to pass the first stage
//
const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const header = DNSHeader.write(defaultHeader);
        const question = Question.write([defaultQuestion]);
        const answer = Answer.write([defaultAnswer]);
        const response = Buffer.concat([header, question , answer]);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
