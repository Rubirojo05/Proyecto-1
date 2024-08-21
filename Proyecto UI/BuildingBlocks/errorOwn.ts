export class ErrorOwn{

    constructor(public message: string){
    }
    public toString(): string {
        return this.message;
    }
}