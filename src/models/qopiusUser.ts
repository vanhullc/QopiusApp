export class qopiusUser {
  toolkits: string[];
  rights: string;
  companyID: string;
  companyName: string;
  session_password: string;
  accountID: string;

  constructor( toolkits: string[], rights: string, companyID: string, companyName: string, session_password: string, accountID: string ) {
    this.toolkits = toolkits;
    this.rights = rights;
    this.companyID = companyID;
    this.companyName = companyName;
    this.session_password = session_password;
    this.accountID = accountID;
  }
}
