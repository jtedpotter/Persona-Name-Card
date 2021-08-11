@isTest(SeeAllData=true)
public class GetDatatTest {
  // Set Org Type
  static String OrgType = 'MDO';
  //static String OrgType = 'SDO';

  // Define variables
  static User testUser;
  static Id userId;

  static void initTestData() {
    // TODO: Stage all data dynamically via inserts?
    if(OrgType=='SDO'){
      // SDO - Trial Org
      userId = '???';
    }else if(OrgType=='MDO'){
    // MDO
        testUser = [SELECT Id FROM User WHERE Name LIKE '%Marklein%' LIMIT 1];  
        userId = testUser.Id;
    }

  }
  static testMethod void test_getContactPageURL() {
    initTestData();
    GetData.getContactPageURL(userId);
  }
}