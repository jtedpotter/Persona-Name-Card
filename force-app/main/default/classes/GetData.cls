public with sharing class GetData {
    @AuraEnabled
    public static string getContactPageURL(String userId){
        try {
            String test1;
            String test2;
            String test3;
            
            String contactId = [Select Id from Contact where pse__Salesforce_User__c =: userId].Id;
            String contactPageURL = 'https://'+ URL.getSalesforceBaseUrl().getHost() + '/lightning/r/Contact/' + contactId + '/view';
            return contactPageURL;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
