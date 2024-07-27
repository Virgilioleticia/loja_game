import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "../../produto/entities/produto.entity"


@Entity({name: "tb_categorias"})
export class Categorias {
    static id: any
    [x: string]: any

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string
    
    @OneToMany(() => Produto, (produto) => produto.categorias)
    produto: Produto[]
}