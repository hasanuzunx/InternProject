import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int",{ nullable: true })
  selected_base_map: number;

  @Column("text",{ nullable: true })
  layer_name: string;

  @Column("text",{ nullable: true })
  layer_visibility: string;

  @Column("text", { nullable: true , array: true })
  map_layer_apis: string[];
}
