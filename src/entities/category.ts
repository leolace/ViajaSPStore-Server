import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm"
import TripPackage from "./tripPackage"
import City from "./city"

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 100 })
  name: string

  @ManyToMany(() => TripPackage, (tripPackage) => tripPackage.categories)
  @JoinTable({
    name: "trip_packages_categories",
    joinColumn: { name: "category_id", referencedColumnName: "id" },
    inverseJoinColumn: {
      name: "trip_package_id",
      referencedColumnName: "id"
    }
  })
  tripPackages: TripPackage[]

  @ManyToMany(() => City, (city) => city.categories)
  @JoinTable({
    name: "cities_categories",
    joinColumn: { name: "category_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "city_id", referencedColumnName: "id" }
  })
  cities: City[]
}

export default Category
