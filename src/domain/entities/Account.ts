import { Entity } from "../core/Entity";

type AccountProps = {
  name: string;
  balanceInitial: number;
  projectId: string;
  type: 'CAIXA' | 'BANCO';
  createdAt: Date;
}

export class Account extends Entity<AccountProps>{
  private constructor(props: AccountProps, id?: string ) {
    super(props, id);
  }

  static create(props: AccountProps, id?: string ) {
    const account = new Account(props, id);  

    return account;
  }
}
