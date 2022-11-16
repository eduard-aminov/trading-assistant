const {writeFile} = require('fs');
const {argv} = require('yargs');
require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
                   ? `./src/environments/environment.prod.ts`
                   : `./src/environments/environment.ts`;

const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   TELEGRAM_BOT_TOKEN: "${process.env['TELEGRAM_BOT_TOKEN']}",
   TRADING_VIEW_AUTH_TOKEN: "${process.env['TRADING_VIEW_AUTH_TOKEN']}",
};
`;

writeFile(targetPath, environmentFileContent, (err: Error | null) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
