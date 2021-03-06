/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables.records;


import java.sql.Timestamp;

import javax.annotation.Generated;

import org.jooq.Record1;
import org.jooq.impl.UpdatableRecordImpl;

import uk.gov.beis.dceas.db.gen.tables.EcoSelfReferral;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.9.6"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class EcoSelfReferralRecord extends UpdatableRecordImpl<EcoSelfReferralRecord> {

    private static final long serialVersionUID = -2036970164;

    /**
     * Setter for <code>eco_self_referral.id</code>.
     */
    public EcoSelfReferralRecord setId(Long value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>eco_self_referral.created</code>.
     */
    public EcoSelfReferralRecord setCreated(Timestamp value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.created</code>.
     */
    public Timestamp getCreated() {
        return (Timestamp) get(1);
    }

    /**
     * Setter for <code>eco_self_referral.lmk_key</code>.
     */
    public EcoSelfReferralRecord setLmkKey(String value) {
        set(2, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.lmk_key</code>.
     */
    public String getLmkKey() {
        return (String) get(2);
    }

    /**
     * Setter for <code>eco_self_referral.name</code>.
     */
    public EcoSelfReferralRecord setName(String value) {
        set(3, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.name</code>.
     */
    public String getName() {
        return (String) get(3);
    }

    /**
     * Setter for <code>eco_self_referral.email</code>.
     */
    public EcoSelfReferralRecord setEmail(String value) {
        set(4, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.email</code>.
     */
    public String getEmail() {
        return (String) get(4);
    }

    /**
     * Setter for <code>eco_self_referral.phone_number</code>.
     */
    public EcoSelfReferralRecord setPhoneNumber(String value) {
        set(5, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.phone_number</code>.
     */
    public String getPhoneNumber() {
        return (String) get(5);
    }

    /**
     * Setter for <code>eco_self_referral.receive_pension_guarantee_credit</code>.
     */
    public EcoSelfReferralRecord setReceivePensionGuaranteeCredit(Boolean value) {
        set(6, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.receive_pension_guarantee_credit</code>.
     */
    public Boolean getReceivePensionGuaranteeCredit() {
        return (Boolean) get(6);
    }

    /**
     * Setter for <code>eco_self_referral.receive_income_related_benefits</code>.
     */
    public EcoSelfReferralRecord setReceiveIncomeRelatedBenefits(Boolean value) {
        set(7, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.receive_income_related_benefits</code>.
     */
    public Boolean getReceiveIncomeRelatedBenefits() {
        return (Boolean) get(7);
    }

    /**
     * Setter for <code>eco_self_referral.receive_societal_benefits</code>.
     */
    public EcoSelfReferralRecord setReceiveSocietalBenefits(Boolean value) {
        set(8, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.receive_societal_benefits</code>.
     */
    public Boolean getReceiveSocietalBenefits() {
        return (Boolean) get(8);
    }

    /**
     * Setter for <code>eco_self_referral.receive_defense_related_benefits</code>.
     */
    public EcoSelfReferralRecord setReceiveDefenseRelatedBenefits(Boolean value) {
        set(9, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.receive_defense_related_benefits</code>.
     */
    public Boolean getReceiveDefenseRelatedBenefits() {
        return (Boolean) get(9);
    }

    /**
     * Setter for <code>eco_self_referral.receive_child_benefits</code>.
     */
    public EcoSelfReferralRecord setReceiveChildBenefits(Boolean value) {
        set(10, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.receive_child_benefits</code>.
     */
    public Boolean getReceiveChildBenefits() {
        return (Boolean) get(10);
    }

    /**
     * Setter for <code>eco_self_referral.income</code>.
     */
    public EcoSelfReferralRecord setIncome(Integer value) {
        set(11, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.income</code>.
     */
    public Integer getIncome() {
        return (Integer) get(11);
    }

    /**
     * Setter for <code>eco_self_referral.address1</code>.
     */
    public EcoSelfReferralRecord setAddress1(String value) {
        set(12, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.address1</code>.
     */
    public String getAddress1() {
        return (String) get(12);
    }

    /**
     * Setter for <code>eco_self_referral.address2</code>.
     */
    public EcoSelfReferralRecord setAddress2(String value) {
        set(13, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.address2</code>.
     */
    public String getAddress2() {
        return (String) get(13);
    }

    /**
     * Setter for <code>eco_self_referral.address3</code>.
     */
    public EcoSelfReferralRecord setAddress3(String value) {
        set(14, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.address3</code>.
     */
    public String getAddress3() {
        return (String) get(14);
    }

    /**
     * Setter for <code>eco_self_referral.postcode</code>.
     */
    public EcoSelfReferralRecord setPostcode(String value) {
        set(15, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.postcode</code>.
     */
    public String getPostcode() {
        return (String) get(15);
    }

    /**
     * Setter for <code>eco_self_referral.tenure_type</code>.
     */
    public EcoSelfReferralRecord setTenureType(Integer value) {
        set(16, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.tenure_type</code>.
     */
    public Integer getTenureType() {
        return (Integer) get(16);
    }

    /**
     * Setter for <code>eco_self_referral.home_type</code>.
     */
    public EcoSelfReferralRecord setHomeType(Integer value) {
        set(17, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.home_type</code>.
     */
    public Integer getHomeType() {
        return (Integer) get(17);
    }

    /**
     * Setter for <code>eco_self_referral.number_of_storeys</code>.
     */
    public EcoSelfReferralRecord setNumberOfStoreys(Integer value) {
        set(18, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.number_of_storeys</code>.
     */
    public Integer getNumberOfStoreys() {
        return (Integer) get(18);
    }

    /**
     * Setter for <code>eco_self_referral.number_of_storeys_in_building</code>.
     */
    public EcoSelfReferralRecord setNumberOfStoreysInBuilding(Integer value) {
        set(19, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.number_of_storeys_in_building</code>.
     */
    public Integer getNumberOfStoreysInBuilding() {
        return (Integer) get(19);
    }

    /**
     * Setter for <code>eco_self_referral.built_form</code>.
     */
    public EcoSelfReferralRecord setBuiltForm(Integer value) {
        set(20, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.built_form</code>.
     */
    public Integer getBuiltForm() {
        return (Integer) get(20);
    }

    /**
     * Setter for <code>eco_self_referral.flat_exposed_wall_type</code>.
     */
    public EcoSelfReferralRecord setFlatExposedWallType(Integer value) {
        set(21, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.flat_exposed_wall_type</code>.
     */
    public Integer getFlatExposedWallType() {
        return (Integer) get(21);
    }

    /**
     * Setter for <code>eco_self_referral.home_age_band</code>.
     */
    public EcoSelfReferralRecord setHomeAgeBand(Integer value) {
        set(22, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.home_age_band</code>.
     */
    public Integer getHomeAgeBand() {
        return (Integer) get(22);
    }

    /**
     * Setter for <code>eco_self_referral.number_of_bedrooms</code>.
     */
    public EcoSelfReferralRecord setNumberOfBedrooms(Integer value) {
        set(23, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.number_of_bedrooms</code>.
     */
    public Integer getNumberOfBedrooms() {
        return (Integer) get(23);
    }

    /**
     * Setter for <code>eco_self_referral.has_loft</code>.
     */
    public EcoSelfReferralRecord setHasLoft(Boolean value) {
        set(24, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.has_loft</code>.
     */
    public Boolean getHasLoft() {
        return (Boolean) get(24);
    }

    /**
     * Setter for <code>eco_self_referral.has_loft_insulation</code>.
     */
    public EcoSelfReferralRecord setHasLoftInsulation(Boolean value) {
        set(25, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.has_loft_insulation</code>.
     */
    public Boolean getHasLoftInsulation() {
        return (Boolean) get(25);
    }

    /**
     * Setter for <code>eco_self_referral.is_loft_accessible_and_clear_of_clutter</code>.
     */
    public EcoSelfReferralRecord setIsLoftAccessibleAndClearOfClutter(Boolean value) {
        set(26, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.is_loft_accessible_and_clear_of_clutter</code>.
     */
    public Boolean getIsLoftAccessibleAndClearOfClutter() {
        return (Boolean) get(26);
    }

    /**
     * Setter for <code>eco_self_referral.has_loft_history_of_infestation</code>.
     */
    public EcoSelfReferralRecord setHasLoftHistoryOfInfestation(Boolean value) {
        set(27, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.has_loft_history_of_infestation</code>.
     */
    public Boolean getHasLoftHistoryOfInfestation() {
        return (Boolean) get(27);
    }

    /**
     * Setter for <code>eco_self_referral.has_loft_history_of_water_damage</code>.
     */
    public EcoSelfReferralRecord setHasLoftHistoryOfWaterDamage(Boolean value) {
        set(28, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.has_loft_history_of_water_damage</code>.
     */
    public Boolean getHasLoftHistoryOfWaterDamage() {
        return (Boolean) get(28);
    }

    /**
     * Setter for <code>eco_self_referral.wall_type</code>.
     */
    public EcoSelfReferralRecord setWallType(Integer value) {
        set(29, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.wall_type</code>.
     */
    public Integer getWallType() {
        return (Integer) get(29);
    }

    /**
     * Setter for <code>eco_self_referral.fuel_type</code>.
     */
    public EcoSelfReferralRecord setFuelType(Integer value) {
        set(30, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.fuel_type</code>.
     */
    public Integer getFuelType() {
        return (Integer) get(30);
    }

    /**
     * Setter for <code>eco_self_referral.has_hot_water_cylinder</code>.
     */
    public EcoSelfReferralRecord setHasHotWaterCylinder(Boolean value) {
        set(31, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.has_hot_water_cylinder</code>.
     */
    public Boolean getHasHotWaterCylinder() {
        return (Boolean) get(31);
    }

    /**
     * Setter for <code>eco_self_referral.has_condensing_boiler</code>.
     */
    public EcoSelfReferralRecord setHasCondensingBoiler(Boolean value) {
        set(32, value);
        return this;
    }

    /**
     * Getter for <code>eco_self_referral.has_condensing_boiler</code>.
     */
    public Boolean getHasCondensingBoiler() {
        return (Boolean) get(32);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Long> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached EcoSelfReferralRecord
     */
    public EcoSelfReferralRecord() {
        super(EcoSelfReferral.ECO_SELF_REFERRAL);
    }

    /**
     * Create a detached, initialised EcoSelfReferralRecord
     */
    public EcoSelfReferralRecord(Long id, Timestamp created, String lmkKey, String name, String email, String phoneNumber, Boolean receivePensionGuaranteeCredit, Boolean receiveIncomeRelatedBenefits, Boolean receiveSocietalBenefits, Boolean receiveDefenseRelatedBenefits, Boolean receiveChildBenefits, Integer income, String address1, String address2, String address3, String postcode, Integer tenureType, Integer homeType, Integer numberOfStoreys, Integer numberOfStoreysInBuilding, Integer builtForm, Integer flatExposedWallType, Integer homeAgeBand, Integer numberOfBedrooms, Boolean hasLoft, Boolean hasLoftInsulation, Boolean isLoftAccessibleAndClearOfClutter, Boolean hasLoftHistoryOfInfestation, Boolean hasLoftHistoryOfWaterDamage, Integer wallType, Integer fuelType, Boolean hasHotWaterCylinder, Boolean hasCondensingBoiler) {
        super(EcoSelfReferral.ECO_SELF_REFERRAL);

        set(0, id);
        set(1, created);
        set(2, lmkKey);
        set(3, name);
        set(4, email);
        set(5, phoneNumber);
        set(6, receivePensionGuaranteeCredit);
        set(7, receiveIncomeRelatedBenefits);
        set(8, receiveSocietalBenefits);
        set(9, receiveDefenseRelatedBenefits);
        set(10, receiveChildBenefits);
        set(11, income);
        set(12, address1);
        set(13, address2);
        set(14, address3);
        set(15, postcode);
        set(16, tenureType);
        set(17, homeType);
        set(18, numberOfStoreys);
        set(19, numberOfStoreysInBuilding);
        set(20, builtForm);
        set(21, flatExposedWallType);
        set(22, homeAgeBand);
        set(23, numberOfBedrooms);
        set(24, hasLoft);
        set(25, hasLoftInsulation);
        set(26, isLoftAccessibleAndClearOfClutter);
        set(27, hasLoftHistoryOfInfestation);
        set(28, hasLoftHistoryOfWaterDamage);
        set(29, wallType);
        set(30, fuelType);
        set(31, hasHotWaterCylinder);
        set(32, hasCondensingBoiler);
    }
}
