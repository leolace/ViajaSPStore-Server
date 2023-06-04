import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("customers")
class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 100 })
  name: string

  @Column({ type: "varchar", length: 100, unique: true })
  email: string

  @Column({ type: "text" })
  password: string

  @Column({ type: "varchar", length: 11, unique: true })
  cpf: string

  @Column({ type: "varchar", length: 100, nullable: true })
  address: string

  @Column({ type: "boolean", default: false })
  verified: boolean
}

export default Customer
