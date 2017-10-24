import {PropertyType} from './property-type';
import {BuiltForm} from './built-form';
import {FlatLevel} from './flat-level';
import {HomeAge} from '../../../../questionnaire/questionnaires/home-basics/questions/home-age-question/home-age';
import {FuelType} from '../../../../questionnaire/questionnaires/home-basics/questions/fuel-type-question/fuel-type';
import {HomeType} from '../../../../questionnaire/questionnaires/home-basics/questions/home-type-question/home-type';
import {ResponseData} from '../../../response-data/response-data';
import * as _ from "lodash";

export class RdSapInput {
    property_type: string;
    built_form: string;
    flat_level: string;
    construction_date: string;
    floor_area: string;
    num_storeys: number;
    num_bedrooms: number;
    heating_fuel: string;
    measures: string;

    constructor(responseData: ResponseData) {
        // TODO: This is not currently a full correct mapping to RdSAP. For a full mapping, the homeType question needs to be changed.
        // This is a 'best possible' mapping based on the current questions, to enable a PoC connection to the BRE API.
        // See BEISDEAS-28 for updating the questions to allow a correct mapping.
        this.property_type = _.toString(RdSapInput.getPropertyType(responseData.homeType));
        this.built_form = _.toString(RdSapInput.getBuiltForm(responseData.homeType));
        this.flat_level = _.toString(RdSapInput.getFlatLevel(responseData.homeType));
        this.construction_date = RdSapInput.getConstructionDateEncoding(responseData.homeAge);
        this.floor_area = undefined;
        this.num_storeys = responseData.numberOfStoreys;
        this.num_bedrooms = responseData.numberOfBedrooms;
        this.heating_fuel = RdSapInput.getFuelTypeEncoding(responseData.fuelType);
        this.measures = 'Y';
    }

    public isMinimalDataSet() {
        let requiredProperties = [
            this.property_type,
            this.built_form,
            this.construction_date,
            this.heating_fuel
        ];
        if (this.property_type === _.toString(PropertyType.Flat)) {
            requiredProperties.push(this.flat_level);
        }
        if (!this.floor_area) {
            requiredProperties.push(_.toString(this.num_storeys));
            requiredProperties.push(_.toString(this.num_bedrooms));
        }
        return requiredProperties.every(value => {
            return value && value.length > 0;
        });
    }

    private static getPropertyType(homeType: HomeType): PropertyType {
        switch(homeType) {
            case HomeType.DetachedHouse:         { return PropertyType.House; }
            case HomeType.SemiDetachedHouse:     { return PropertyType.House; }
            case HomeType.EndTerraceHouse:       { return PropertyType.House; }
            case HomeType.MidTerraceHouse:       { return PropertyType.House; }
            case HomeType.GroundFloorFlat:       { return PropertyType.Flat; }
            case HomeType.MidFloorFlat:          { return PropertyType.Flat; }
            case HomeType.TopFloorFlat:          { return PropertyType.Flat; }
            case HomeType.BungalowDetached:      { return PropertyType.Bungalow; }
            case HomeType.BungalowAttached:      { return PropertyType.Bungalow; }
            case HomeType.ParkHome:              { return PropertyType.ParkHome; }
            default:                             { return null; }
        }
    }

    private static getBuiltForm(homeType: HomeType): BuiltForm {
        switch(homeType) {
            case HomeType.DetachedHouse:         { return BuiltForm.Detached; }
            case HomeType.SemiDetachedHouse:     { return BuiltForm.SemiDetached; }
            case HomeType.EndTerraceHouse:       { return BuiltForm.EndTerrace }
            case HomeType.MidTerraceHouse:       { return BuiltForm.MidTerrace }
            case HomeType.GroundFloorFlat:       { return BuiltForm.MidTerrace; }
            case HomeType.MidFloorFlat:          { return BuiltForm.MidTerrace; }
            case HomeType.TopFloorFlat:          { return BuiltForm.MidTerrace; }
            case HomeType.BungalowDetached:      { return BuiltForm.Detached; }
            case HomeType.BungalowAttached:      { return BuiltForm.SemiDetached; }
            case HomeType.ParkHome:              { return BuiltForm.Detached; }
            default:                             { return null; }
        }
    }

    private static getFlatLevel(homeType: HomeType): FlatLevel {
        switch(homeType) {
            case HomeType.GroundFloorFlat:  { return FlatLevel.GroundFloor; }
            case HomeType.MidFloorFlat:     { return FlatLevel.MidFloor; }
            case HomeType.TopFloorFlat:     { return FlatLevel.TopFloor; }
        }
    }

    private static getConstructionDateEncoding(homeAge: HomeAge): string {
        const encodingCharacters = 'ABCDEFGHIJKL';
        return encodingCharacters.charAt(homeAge);
    }

    private static getFuelTypeEncoding(fuelType: FuelType): string {
        switch(fuelType) {
            case FuelType.SolidFuel:   { return '9'; }
            case FuelType.MainsGas:    { return '26'; }
            case FuelType.LPGGas:      { return '27'; }
            case FuelType.HeatingOil:  { return '28'; }
            case FuelType.Electricity: { return '29'; }
        }
    }
}