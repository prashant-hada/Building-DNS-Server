export enum OpCode{
    STANDARD_QUERY = 0,
    INVERSE_QUERY = 1
}

export enum ResponseCode{
    NO_ERROR = 0,
    FORMAT_ERROR = 1,
    SERVER_ERROR = 2,
    NAME_ERROR = 3
}
export interface TDNSHeader{
    id: number ;
    qr: number ;
    opCode:OpCode ;
    aa: number ;
    tc: number ;
    rd: number ;
    ra :number ;
    z: number ;
    rCode : ResponseCode ;
    qdCount : number ;
    anCount : number ;
    nsCount: number ;
    arCount : number
}

export class DNSHeader{
    static write(value:TDNSHeader) : Buffer {
        const header = Buffer.alloc(12);
        const flags =
          value.qr |
          value.opCode |
          value.aa |
          value.tc |
          value.rd |
          value.ra |
          value.z |
          value.rCode;

          header.writeInt16BE(value.id , 0);
          header.writeInt16BE(flags , 2);
          header.writeInt16BE(value.qdCount , 4);
          header.writeInt16BE(value.anCount , 6);
          header.writeInt16BE(value.nsCount , 8);
          header.writeInt16BE(value.arCount , 10);

        return header
    }
}