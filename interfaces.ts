export type PostgresDatabaseInterface = {
  init: () => Promise<void>;
  disconnect(): void;
  query<Result>({ raw, values }: { raw: string; values?: any[] }): Promise<{
    rows: Result[];
    count: number;
  }>;
  healthCheck: () => Promise<void>;
};
