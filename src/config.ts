interface Config {
  adsense: {
    client: string;
    slot: string;
    enabled: boolean;
  };
  app: {
    env: 'development' | 'production';
    url: string;
  };
}

const isDevelopment = import.meta.env.DEV;

const config: Config = {
  adsense: {
    client: isDevelopment ? 'ca-pub-4120129651355049' : 'ca-pub-4120129651355049',
    slot: isDevelopment ? '3538486082' : '3538486082',
    enabled: !isDevelopment, // Disable ads in development
  },
  app: {
    env: isDevelopment ? 'development' : 'production',
    url: isDevelopment ? 'http://localhost:3000' : 'https://toolzilla.app',
  },
};

export default config; 