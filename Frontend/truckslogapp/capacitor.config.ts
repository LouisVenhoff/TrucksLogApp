import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.truckslogapp.app',
  appName: 'TrucksLogApp',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    allowNavigation: ["app.truckslog.de"]
  }
};

export default config;
