import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("customers")
class customer {
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

  @Column({ type: "varchar", length: 100 })
  address: string
}

export default customer
