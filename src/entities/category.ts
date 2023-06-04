import { Entity, ManyToMany, PrimaryColumn } from "typeorm"
import TripPackage from "./tripPackage"
import City from "./city"

@Entity("categories")
class Category {
  @PrimaryColumn({ type: "varchar" })
  name: string

  @ManyToMany(() => TripPackage, (tripPackage) => tripPackage.categories)
  tripPackages: TripPackage[]

  @ManyToMany(() => City, (city) => city.categories)
  cities: City[]
}

export default Category
