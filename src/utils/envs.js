export const envVars = {
  local: {
    BASE_URL: 'http://localhost:5000/',
  },
  dev: {
    BASE_URL: 'https://mealpal-develop.herokuapp.com/',
  },
  prod: {
    BASE_URL: 'https://mealpal-thao.herokuapp.com/',
  },
};

export const getEnvVars = (host) => {
  console.log(host);
  switch (true) {
    case host.includes('localhost'):
      return envVars.local;
    case host.includes('-dev'):
      return envVars.dev;
    case host.includes('mealpal.netlify.app'):
      return envVars.prod;
    default:
      console.error('Failed to load configuration', {
        code: 'env_not_detected',
        desc: 'host url does not match known environments',
      });
      return {};
  }
};
