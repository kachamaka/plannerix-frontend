export class SingleSubject {
    public subject: string;
    public checked: boolean;
    public SIP: boolean;
    public ZIP: boolean;

    constructor(subject: string, checked: boolean, SIP: boolean, ZIP:boolean){
        this.subject = subject;
        this.checked = checked;
        this.SIP = SIP;
        this.ZIP = ZIP;
    }
}

export class Subject {
    constructor(public name: String, public id:Number = undefined){}

    prepereToSendForChange() {
        return name;
    }
}