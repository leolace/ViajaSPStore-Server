import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import TripPackage from "./tripPackage"
import Accommodation from "./accommodation"
import Category from "./category"

@Entity("cities")
class City {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 100 })
  name: string

  @Column({ type: "char", length: 2, default: "SP" })
  state: string

  @Column({ type: "varchar", array: true, nullable: true })
  attractions: string[]

  @Column({ type: "text" })
  about: string

  @Column({ type: "text", nullable: true, array: true })
  images: string[]

  @OneToMany(() => TripPackage, (tripPackage) => tripPackage.city, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  tripPackages: TripPackage[]

  @ManyToMany(() => Category, (category) => category.cities, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  categories: Category[]
}

export default City
