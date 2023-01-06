import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { GroupEntity } from "./group";

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  filename: string;

  @Column()
  url: string;

  @ManyToOne(() => GroupEntity, (group) => group.images)
  group: Relation<GroupEntity>;
}