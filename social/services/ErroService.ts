


export class LoginError extends Error {
    statusCode = 404;

    constructor(message: string){
        super(message);

        Object.setPrototypeOf(this, LoginError.prototype);
    }

    
}