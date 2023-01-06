import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import type { Relation } from "typeorm";
import { ImageEntity } from "./image";

@Entity('group')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  name: string

  @Column("text")
  description: string

  @OneToMany(() => ImageEntity, (image) => image.group)
  images: Relation<ImageEntity>[]
}