import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categorias } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categorias)
        private categoriasRepository: Repository<Categorias>
    ) { }

    async findAll(): Promise<Categorias[]> {
        return await this.categoriasRepository.find({
            relations: {
                produto: true
            }
        });
    }

    async findById(id: number): Promise<Categorias> {

        let categorias = await this.categoriasRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        });

        if (!categorias)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categorias;
    }

    async findByNome(nome: string): Promise<Categorias[]> {
        return await this.categoriasRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                produto: true
            }
        })
    }

    async create(Categorias: Categorias): Promise<Categorias> {
        return await this.categoriasRepository.save(Categorias);
    }

    async update(categorias: Categorias): Promise<Categorias> {

        let buscaCategorias = await this.findById(categorias.id);

        if (!buscaCategorias || !Categorias.id)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return await this.categoriasRepository.save(categorias);
    }

    async delete(id: number): Promise<DeleteResult> {

        let buscaCategorias = await this.findById(id);

        if (!buscaCategorias)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return await this.categoriasRepository.delete(id);

    }

}