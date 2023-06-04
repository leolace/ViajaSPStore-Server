import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import TripPackage from "./tripPackage"
import Accommodation from "./accommodation"

@Entity("cities")
class City {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 100 })
  name: string

  @Column({ type: "char", length: 2, default: "SP" })
  state: string

  @Column({ type: "varchar" })
  attractions: string[]

  @Column({ type: "text" })
  about: string

  @OneToMany(() => City, (city) => city.tripPackages)
  tripPackages: TripPackage[]

  @OneToMany(() => City, (city) => city.accommodations)
  accommodations: Accommodation[]
}

export default City
