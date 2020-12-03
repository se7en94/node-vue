import { User } from '@libs/db/models/user.model';
import { Controller } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Crud({
    model: User,
    routes: {
        find: {
            decorators: [ApiOperation({ summary: '用户列表' })]
        },
        create: {
            // dto: 
        }
    }
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
    constructor(@InjectModel(User) private readonly model: ModelType<User>) { }
}
