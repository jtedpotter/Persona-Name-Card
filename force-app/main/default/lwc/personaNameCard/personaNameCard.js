import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id'; //this is how you will retreive the USER ID of current in user.
import NAME_FIELD from '@salesforce/schema/User.Name';
import TITLE_FIELD from '@salesforce/schema/User.Title';
import IMAGE_FIELD from '@salesforce/schema/User.MediumPhotoUrl';
import BANNER_IMAGE_FIELD from '@salesforce/schema/User.BannerPhotoUrl';
import getContactPageURL  from '@salesforce/apex/GetData.getContactPageURL';
export default class userDetails extends LightningElement {
     @track error ;
     @track hasRendered = false;
     @track name;
     @track ContactURL;
     @wire(getRecord, {
         recordId: USER_ID,
         fields: [NAME_FIELD,TITLE_FIELD,IMAGE_FIELD]
     }) wireuser({
         error,
         data
     }) {
         if (error) {
            this.error = error ; 
         } else if (data) {
             this.name = data.fields.Name.value;
             this.title = data.fields.Title.value;
             this.MediumPhotoUrl = data.fields.MediumPhotoUrl.value;
         }
     };
    renderedCallback(){
        if(this.hasRendered == false){
            //alert('get url');
            getContactPageURL({
                userId: USER_ID
            }).then((result)=>{
                //alert(result);
                if(result==null) {
                    // No valid Contact record - set to blank
                    this.ContactURL = '';   
                    //alert(' setting to blank');     
                } else {
                    // We DO have a valid Contact record
                    this.ContactURL=result;
                    //alert('set up anchor on image: ' + this.ContactURL);
                }
            }).catch((error)=>{
                console.log("Error-in getContatPageURL. Error: " + error.name);
                this.showToast('ERROR','Something went wrong. Error: ' + error.body.message,'error');
            }); 
        this.hasRendered = true;
        }
    }

    handleImageClick(event){
        window.open(this.ContactURL, '_blank');
    }
 }