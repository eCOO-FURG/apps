import { Entity, UniqueEntityID } from "@shared/core/Entity";
import { Optional } from "@shared/core/types/Optional";

export interface UserProps {
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
  roles: ("ADMIN" | "PRODUCER" | "USER")[];
  cpf: string;
  created_at: Date;
  updated_at?: Date | null;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get phone() {
    return this.props.phone;
  }

  get first_name() {
    return this.props.first_name;
  }

  get last_name() {
    return this.props.last_name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get roles() {
    return this.props.roles;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  get me() {
    return {
      email: this.email,
      name: `${this.first_name} ${this.last_name}`,
    };
  }

  get private() {
    return {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      phone: this.props.phone,
    };
  }

  static create(
    props: Optional<UserProps, "roles" | "created_at">,
    id?: UniqueEntityID
  ) {
    return new User(
      {
        ...props,
        roles: props.roles || ["USER"],
        created_at: props.created_at ?? new Date(),
      },
      id
    );
  }
}
