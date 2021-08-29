import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Form,Button,Input} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component{
   state = {
       minimumContribution:''
   };

   //factory campaigns will be async in nature..
  onSubmit = async(e) => {
     e.preventDefault();

     const accounts=await web3.eth.getAccounts();

     await factory.methods
     .createCampaign(this.state.minimumContribution)
     .send({
       from:accounts[0]
     });

  };

    render(){
        return (
        <Layout>
          <h3>Create a Campaign!</h3>

         <Form onSubmit={this.onSubmit}>
             <Form.Field>
                 <label>Minimum Contribution</label>
                 <Input 
                 label="wei" 
                 labelPosition="right"
                 value={this.setState.minimumContribution}   
                 onChange={event => 
                   this.setState({minimumContribution:event.target.value})}
                 />
             </Form.Field>

             <Button primary>Create!</Button>
         </Form>

        </Layout>
        );
    }
}

export default CampaignNew;