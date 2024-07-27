import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Categorias } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    descricao: string

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty() 
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    preco: number;

    @Column()
    foto: string

    @ManyToOne(() => Categorias, (categorias) => categorias.produto,{
        onDelete: "CASCADE"

    })
    categorias: Categorias

}