import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categorias } from "./entities/categoria.entity";
import { CategoriasService } from "./services/categorias.service";
import { CategoriasController } from "./controllers/categorias.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Categorias])],
    providers: [CategoriasService],
    controllers: [CategoriasController],
    exports: [TypeOrmModule]
})
export class CategoriasModule {}