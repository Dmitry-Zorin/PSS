import { Module } from '@nestjs/common'
import { ApiGatewayModule } from 'api-gateway/api-gateway.module'
import { AuthModule } from 'microservices/auth/auth.module'
import { ResourcesModule } from 'microservices/resources/resources.module'

@Module({
	imports: [ApiGatewayModule, AuthModule, ResourcesModule],
})
export class AppModule {}
