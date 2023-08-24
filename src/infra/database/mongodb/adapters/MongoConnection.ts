import mongoose, { MongooseOptions, mongo } from "mongoose";
import Connection, { ConnectionProps } from "src/shared/ports/connection";

export class MongoConnection implements Connection {
  connection: typeof mongoose;
  props: ConnectionProps;
  private connectionString: string;

  constructor(props: ConnectionProps) {
    Object.entries(props).forEach(([key, value]) => {
      if(!value) throw new Error(`Missing ${key} in connection props`);
    })
    this.props = props;
    this.configure();
  }

  private configure() {
    this.createConnectionString();
  }

  private createConnectionString() {
    this.connectionString = `mongodb://${this.props.user ?? ""}${
      this.props.password ? ":" + this.props.password : ""
    }`;
    if (this.props.user) {
      this.connectionString += "@";
    }
    this.connectionString += `${this.props.host}:${this.props.port}/${this.props.database}`;
  }

  async connect(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      mongoose
        .connect(this.connectionString)
        .then((res) => {
          this.connection = res;
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
