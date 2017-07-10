/**
 * #### :abcd: :arrow_right: :iphone: Provide one's own Verizon employee contact information using the [Cordova Contacts API](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html).
 *
 * The Verizon Profile Pantry is a Web service that returns a cached flat-map of
 * employee attributes that have been
 *
 * 1. Exported from various data sources of truth, e.g., PeopleSoft, CRC, or
 * 2. Derived from [MVFLEX Expression Language (MVEL)](https://en.wikipedia.org/wiki/MVEL).
 *
 * This Javascript callout module adapts the profile pantry's attributes to the
 * Cordova `Contact` interface.
 *
 * > ##### **:warning: Caution:** Profile Pantry attributes are only available to the currently authenticated user.
 * >
 * > In other words, you can see your _own_ profile pantry results, but you
 * cannot see anyone else's.
 * @see {@link https://profilepantry.verizon.com/profiles/0/allowedServices,alternateManager,basePay,birthday,buildingCode,company,companyCode,compPlanDescr,contractorReportsTo,contractorSupervisorFlag,corpId,crossReports,dataSource,deathBenefit,delegation,dentContribution,directReportEIDs,distinguishedName,domainId,edirDisplay,edirDisplayVzw,edpDeferralPercent,edpDefPsu,edpDefRsu,edpIdpBalance,employeeClass,employeeNumber,employeeStatus,employeeType,erlipGuide,execDeferralPlan,execDeferralPlanEnrolled,exempt,externalEmail,feedBasPreTax,feedBasRoth,feedBBaspstTax,feedBeginBalNonQual,feedBeginBalQual,feedBeneFlag,feedCatchup,feedChgMktValNonQual,feedChgMktValuQual,feedcmytd,feedCoMatch,feedCoProfit,feedEeContYtd,feedLeadWithdraw,feedRepayWithdraw,feedRollover,feedRothCatchup,feedSupPreTax,feedSuppsTax,feedSupRoth,feedVestBalNonQual,feedVestBalQual,feedVestIndNonQual,feedVestIndQual,feedWithdrawNonQual,feedWithdrawQual,feeLoanRepay,fidelityCotribution,fidelityDiscretionaryMatch,fidelityParticipant,financeLobName,financeLobNumber,firstName,fullName,hireDate,homeState,hrDeptId,idpEligible,internalEmail,jiveUser,jobTitle,jobTitleCode,laborAgreementNumber,lastName,legacyOrganization,legacyPersonType,lifeContribution,limitOfLiability,ltiTargetAmt,ltiValue,mailCode,managerEid,managerLevel,medContribution,mellonClosingBalance,mellonEmployeePlan,mellonInterestEarned,mellonOpenBalance,mobile,newHireDomainId,newHireFirstName,newHireHireDate,newHireLastName,nfCarryOverHrsBalance,nickname,nonQualifiedCashBal,nonQualifiedCashBal2,nonQualifiedCashBal3,nonQualifiedCashBal4,notesDn,numPerformStockUnit,numRestrictedStockUnit,officePhoneNumber,officialJobTitle,onboardingDirectReports,optionsExercisable,organization,outstandingOptions,payrollCountry,peliParticipant,pensionPlanCode,pensionPlanCode2,pensionPlanCode3,pensionPlanCode4,performStockUnitValue,perhiresWorkCountry,perHrsBalance,perHrsUsed,permanentGrade,permanentManagerLevel,permDeptFunction,personnelSubArea,prehiresCompanyCode,prehiresDomainId,prehiresInternalEmail,prehiresJobTitleCode,prehiresLegacyOrg,prehiresLegacyPersonType,prehiresManagerLevel,prehiresPrimaryDomain,prehiresVzeid,primaryDomain,psFullName,qualifiedCashBal,qualifiedCashBal2,qualifiedCashBal3,qualifiedCashBal4,restrictedStockUnitValue,restrictedStockValue,rothBasicPercentNx,rothCatchupPercentNx,rothSuppPercentNx,salaryGrade,salesAnnualRates,salesCalendarYears,salesCommissionsPaid,salesEmployee,salesIncentive,salesSTIActualAmounts,salesSTITargetAmounts,salesTargetCommissions,salesTargetMBOs,serviceDate,stiDeferralPercent,stiPlanAmount,stiPlanPercentOfBase,stiValue,subOrganization,supervisor,temporaryGrade,temporaryIncreaseAmt,totalTargetCompensation,treeHierarchy,treeLobName,treeLobNumber,tuitionAnnualCap,tuitionReimbursedAmt,vacAnnualEligibility,vacHrsBalance,vacHrsUsed,valueOptionsExercisable,valueOutstandingOptions,velipParticipant,velipPremium,vipPercent,vipTarget,vPerOrg,vz401kCont,vzbGrade,vzEdpCont,vzEdpStiPlanMatch,vzeid,vzid,vztPersonalHoursRemainingBalance,vztPersonalHoursStartingBalance,vztPersonalHoursUsedYTD,vztPersonalNonforfeitableHours,vztVacationCurrentYearMaxAccrual,vztVacationEarned,vztVacationHoursAccruedYTD,vztVacationHoursStartingBalance,vztVacationHoursUsedYTD,vztVacationNonforfeitableHours,vztVacationRemainingAccruableHours,vztVacationRemainingAccruedHours,vzVelipCont,vzwPerHrsAvail,vzwPerHrsBalance,vzwPerHrsUsed,vzwVacAnnualEligibility,vzwVacHrsBalance,vzwVacHrsUsed,vzwVacMaxAccrualHrs,workCity,workCountry,workPostalCode,workState,workStreet,ytr401kBalance,ytr401kBasicAfterTax,ytr401kBasicBeforeTax,ytr401kCatchup,ytr401kSuppAfterTax,ytr401kSuppBeforeTax,ytrCompanyCode,ytrHireDate,ytrPermanentGrade|Your Profile from `profilepantry`}
 * @author Greg Swindle <gregory.jay.swindle@verizon.com>
 * @module cordova-contacts
 */

/**
 * @ignore
 */
const cordovaContactType = require('./cordova-contact-type')

/**
 * @ignore
 */
const profilePantryToCordovaContact = require('./profile-pantry-to-cordova-contact')

const cordovaContacts = {
  cordovaContactType,
  profilePantryToCordovaContact
}

module.exports = cordovaContacts
