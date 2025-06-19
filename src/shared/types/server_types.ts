interface App {
  name: string;
  port: number;
  host: string;
}

interface Database {
  host: string;
  name: string;
  port: number;
  username: string;
  password: string;
}

export interface ServerConfig {
  app: App;
  database: Database;
}
