import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.modules';
import { Categorias } from './categoria/entities/categoria.entity';
import { CategoriasModule } from './categoria/categoria.modules';



@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_loja_games',
    entities: [Produto, Categorias],
    synchronize: true,
    }),
    ProdutoModule,
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
