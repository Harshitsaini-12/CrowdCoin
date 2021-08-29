import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse (CampaignFactory.interface),
    '0x1d460498acc30663c9A74a05de6Dd28f2C9b072C'
);


export default instance;