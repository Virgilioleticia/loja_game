import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations:{
                categorias: true,
                usuario: true
            }
        });
    }

    async findBayId(id: number): Promise<Produto> {
       
        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations:{
                categorias: true,
                usuario: true
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations:{
                categorias: true,
                usuario: true
            }
        })
    }

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);

    }

    async update(produto: Produto): Promise<Produto> {
       
        let buscaProduto: Produto = await this.findBayId(produto.id);
        
        if (!buscaProduto || !produto.id)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.save(produto);
    
    }

    async delete(id: number): Promise<DeleteResult> {
       
        let buscaProduto = await this.findBayId(id);
        
        if (!buscaProduto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.delete(id);
    
    }

}