import { Type } from "class-transformer"

export class UserDto {
    email: string
    age: number
    name: string

    @Type(() => )
    reports: Report[]
}