import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
export class JwtStrategy extends PassportStrategy(Strategy) {

    

    validate(...args: any[]): unknown {
        throw new Error("Method not implemented.");
    }
}