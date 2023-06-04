import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import City from "@entity/city"
import Accommodation from "./accommodation"

@Entity("tripPackages")
class TripPackage {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => City, (city) => city.tripPackages)
  city: City

  @Column({ type: "int" })
  price: number

  @Column({ type: "varchar", length: 100 })
  transport: string

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.tripPackages)
  accommodation: Accommodation

  @Column({ type: "date" })
  departureDate: Date

  @Column({ type: "date" })
  returnDate: Date
}

export default TripPackage
