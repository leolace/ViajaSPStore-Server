import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("auth")
class Auth {
  @PrimaryColumn({ type: "uuid" })
  userId: string

  @Column({ type: "text" })
  token: string
}

export default Auth
