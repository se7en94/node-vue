import { ApiProperty } from '@nestjs/swagger'
import { ModelOptions, prop } from '@typegoose/typegoose'

// 为接口添加时间戳
@ModelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class User {
    @ApiProperty({ description: '用户名', example: 'user1' })
    @prop()
    username: string

    @ApiProperty({ description: '密码', example: 'pass1' })
    @prop()
    password: string
}