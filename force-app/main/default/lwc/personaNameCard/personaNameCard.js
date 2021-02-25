import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id'; //this is how you will retreive the USER ID of current in user.
import NAME_FIELD from '@salesforce/schema/User.Name';
import TITLE_FIELD from '@salesforce/schema/User.Title';
import IMAGE_FIELD from '@salesforce/schema/User.MediumPhotoUrl';
import BANNER_IMAGE_FIELD from '@salesforce/schema/User.BannerPhotoUrl';
export default class userDetails extends LightningElement {
     @track error ;
     @track name;
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
     }
 }