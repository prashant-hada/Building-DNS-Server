export enum DNSQuestionType{
    A = 1,
    NS = 2,
    MD = 3,
    MF = 4,
    CNAME = 5
}
export enum DNSClassCodes{
    IN = 1,
    CS = 2,
}

export interface _DNSQuestion{
   name : string,
   type : DNSQuestionType,
   classCode : DNSClassCodes 
}
export class Question {
  static write(questions:_DNSQuestion[]) {
    return Buffer.concat(
      questions.map((question) => {
        const { name, type, classCode } = question;

        const str =name.split('.').map(n=>`${String.fromCharCode(n.length)}${n}`).join("");
        const typeAndClass = Buffer.alloc(4);

        typeAndClass.writeInt16BE(type);
        typeAndClass.writeInt16BE(classCode, 2);

        return Buffer.concat([Buffer.from(str + "\0", "binary"), typeAndClass]);
      })
    );
  }
}