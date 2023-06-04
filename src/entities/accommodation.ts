import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import TripPackage from "./tripPackage"
import City from "./city"

@Entity("accommodations")
class Accommodation {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 100 })
  name: string

  @ManyToOne(() => City, (city) => city.accommodations)
  city: City

  @Column({ type: "int" })
  rooms: number

  @Column({ type: "real" })
  stars: number

  @OneToMany(() => Accommodation, (accommodation) => accommodation.tripPackages)
  tripPackages: TripPackage[]
}

export default Accommodation
