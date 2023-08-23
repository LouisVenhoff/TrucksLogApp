import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.truckslogapp.app',
  appName: 'TrucksLogApp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
