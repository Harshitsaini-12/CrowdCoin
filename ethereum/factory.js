import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse (CampaignFactory.interface),
    '0xb3bED5D80EBb1717918ad6290d7501840bDFa227'
);


export default instance;