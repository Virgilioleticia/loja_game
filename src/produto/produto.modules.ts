import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { Module } from "@nestjs/common";
import { ProdutoService } from "./services/produto.service";
import { ProdutoController } from "./controllers/produto.controller";
import { CategoriasModule } from "../categoria/categoria.modules";
import { CategoriasService } from "../categoria/services/categorias.service";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriasModule],
    providers: [ProdutoService, CategoriasService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule]
})
export class ProdutoModule {}