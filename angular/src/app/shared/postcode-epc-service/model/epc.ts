import {EpcRating} from "./epc-rating";
import {EpcResponse} from "./response/epc-response";

export class Epc {
    // See https://epc.opendatacommunities.org/docs/guidance for documentation of the data

    public lmkKey: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public postcode: string;
    public buildingReferenceNumber: string;
    public currentEnergyRating: EpcRating;
    public potentialEnergyRating: string;
    public currentEnergyEfficiency: string;
    public potentialEnergyEfficiency: string;
    public propertyType: string;
    public builtForm: string;
    public inspectionDate: string;
    public localAuthorityCode: string;
    public constituency: string;
    public county: string;
    public epcDate: Date;
    public transactionType: string;
    public environmentImpactCurrent: string;
    public environmentImpactPotential: string;
    public energyConsumptionCurrent: string;
    public energyConsumptionPotential: string;
    public co2EmissionsCurrent: string;
    public co2EmissCurrPerFloorArea: string;
    public co2EmissionsPotential: string;
    public lightingCostCurrent: string;
    public lightingCostPotential: string;
    public heatingCostCurrent: string;
    public heatingCostPotential: string;
    public hotWaterCostCurrent: string;
    public hotWaterCostPotential: string;
    public totalFloorArea: string;
    public energyTariff: string;
    public isConnectedToMainsGas: boolean;
    public floorLevel: number;
    public flatTopStorey: boolean;
    public flatStoreyCount: string;
    public mainHeatingControls: string;
    public multiGlazeProportion: string;
    public glazedType: string;
    public glazedArea: string;
    public extensionCount: string;
    public numberHabitableRooms: number;
    public numberHeatedRooms: string;
    public lowEnergyLighting: string;
    public numberOpenFireplaces: string;
    public hotWaterDescription: string;
    public hotWaterEnergyEff: string;
    public hotWaterEnvEff: string;
    public floorDescription: string;
    public floorEnergyEff: string;
    public floorEnvEff: string;
    public windowsDescription: string;
    public windowsEnergyEff: string;
    public windowsEnvEff: string;
    public wallsDescription: string;
    public wallsEnergyEff: string;
    public wallsEnvEff: string;
    public secondHeatDescription: string;
    public sheatingEnergyEff: string;
    public sheatingEnvEff: string;
    public roofDescription: string;
    public roofEnergyEff: string;
    public roofEnvEff: string;
    public mainHeatDescription: string;
    public mainheatEnergyEff: string;
    public mainheatEnvEff: string;
    public mainheatcontDescription: string;
    public mainheatcEnergyEff: string;
    public mainheatcEnvEff: string;
    public lightingDescription: string;
    public lightingEnergyEff: string;
    public lightingEnvEff: string;
    public mainFuel: string;
    public windTurbineCount: string;
    public heatLossCorridor: string;
    public unheatedCorridorLength: string;
    public floorHeight: string;
    public photoSupply: string;
    public solarWaterHeatingFlag: string;
    public mechanicalVentilation: string;
    public address: string;
    public localAuthorityLabel: string;
    public constituencyLabel: string;
    public certificateHash: string;

    private static MAIN_HEAT_DESCRIPTION_EMPTY_RESPONSE = 'Main-Heating';

    constructor(epcResponse: EpcResponse) {
        // TODO: We may not use all these fields and may be able to remove some. We currently use the following fields:
        // NB The data quality is mixed. Any field that we use should be escaped/parsed appropriately and we should be able to deal with
        // a missing or bad field.
        this.lmkKey = epcResponse['lmk-key'];
        this.address1 = epcResponse['address1'];
        this.address2 = epcResponse['address2'];
        this.address3 = epcResponse['address3'];
        this.postcode = epcResponse['postcode'];
        this.currentEnergyRating = EpcRating[epcResponse['current-energy-rating']];
        this.numberHabitableRooms = Epc.getParsedIntegerOrNull(epcResponse['number-habitable-rooms']);
        this.propertyType = epcResponse['property-type'].toLowerCase();
        this.floorLevel = Epc.getParsedFloorLevel(epcResponse['floor-level']);
        this.localAuthorityLabel = epcResponse['local-authority-label'];
        this.mainHeatDescription = (epcResponse['mainheat-description'] === Epc.MAIN_HEAT_DESCRIPTION_EMPTY_RESPONSE) ?
            null : epcResponse['mainheat-description'].toLowerCase();
        this.flatTopStorey = Epc.getParsedBooleanFromEpcResponseValue(epcResponse['flat-top-storey']);
        this.builtForm = epcResponse['built-form'].toLowerCase();
        this.isConnectedToMainsGas = Epc.getParsedBooleanFromEpcResponseValue(epcResponse['mains-gas-flag']);
        this.mainFuel = epcResponse['main-fuel'].toLowerCase(); // TODO: watch out - this field is marked as deprecated in some responses
        this.hotWaterDescription = epcResponse['hotwater-description'].toLowerCase();
        this.localAuthorityCode = epcResponse['local-authority'];
        this.epcDate = new Date(epcResponse['lodgement-date']);
        this.certificateHash = epcResponse['certificate-hash'];

        // TODO: These fields are not currently used; maybe we can remove these later on
        this.buildingReferenceNumber = epcResponse['building-reference-number'];
        this.potentialEnergyRating = epcResponse['potential-energy-rating'];
        this.currentEnergyEfficiency = epcResponse['current-energy-efficiency'];
        this.potentialEnergyEfficiency = epcResponse['potential-energy-efficiency'];
        this.inspectionDate = epcResponse['inspection-date'];
        this.constituency = epcResponse['constituency'];
        this.county = epcResponse['county'];
        this.transactionType = epcResponse['transaction-type'];
        this.environmentImpactCurrent = epcResponse['environment-impact-current'];
        this.environmentImpactPotential = epcResponse['environment-impact-potential'];
        this.energyConsumptionCurrent = epcResponse['energy-consumption-current'];
        this.energyConsumptionPotential = epcResponse['energy-consumption-potential'];
        this.co2EmissionsCurrent = epcResponse['co2-emissions-current'];
        this.co2EmissCurrPerFloorArea = epcResponse['co2-emiss-curr-per-floor-area'];
        this.co2EmissionsPotential = epcResponse['co2-emissions-potential'];
        this.lightingCostCurrent = epcResponse['lighting-cost-current'];
        this.lightingCostPotential = epcResponse['lighting-cost-potential'];
        this.heatingCostCurrent = epcResponse['heating-cost-current'];
        this.heatingCostPotential = epcResponse['heating-cost-potential'];
        this.hotWaterCostCurrent = epcResponse['hot-water-cost-current'];
        this.hotWaterCostPotential = epcResponse['hot-water-cost-potential'];
        this.totalFloorArea = epcResponse['total-floor-area'];
        this.energyTariff = epcResponse['energy-tariff'];
        this.flatStoreyCount = epcResponse['flat-storey-count']; // this is the number of storeys in the apartment block, not the number of storeys in the flat
        this.mainHeatingControls = epcResponse['main-heating-controls'];
        this.multiGlazeProportion = epcResponse['multi-glaze-proportion'];
        this.glazedType = epcResponse['glazed-type'];
        this.glazedArea = epcResponse['glazed-area'];
        this.extensionCount = epcResponse['extension-count'];
        this.numberHeatedRooms = epcResponse['number-heated-rooms'];
        this.lowEnergyLighting = epcResponse['low-energy-lighting'];
        this.numberOpenFireplaces = epcResponse['number-open-fireplaces'];
        this.hotWaterEnergyEff = epcResponse['hot-water-energy-eff'];
        this.hotWaterEnvEff = epcResponse['hot-water-env-eff'];
        this.floorDescription = epcResponse['floor-description'];
        this.floorEnergyEff = epcResponse['floor-energy-eff'];
        this.floorEnvEff = epcResponse['floor-env-eff'];
        this.windowsDescription = epcResponse['windows-description'];
        this.windowsEnergyEff = epcResponse['windows-energy-eff'];
        this.windowsEnvEff = epcResponse['windows-env-eff'];
        this.wallsDescription = epcResponse['walls-description'];
        this.wallsEnergyEff = epcResponse['walls-energy-eff'];
        this.wallsEnvEff = epcResponse['walls-env-eff'];
        this.secondHeatDescription = epcResponse['secondheat-description'];
        this.sheatingEnergyEff = epcResponse['sheating-energy-eff'];
        this.sheatingEnvEff = epcResponse['sheating-env-eff'];
        this.roofDescription = epcResponse['roof-description'];
        this.roofEnergyEff = epcResponse['roof-energy-eff'];
        this.roofEnvEff = epcResponse['roof-env-eff'];
        this.mainheatEnergyEff = epcResponse['mainheat-energy-eff'];
        this.mainheatEnvEff = epcResponse['mainheat-env-eff'];
        this.mainheatcontDescription = epcResponse['mainheatcont-description'];
        this.mainheatcEnergyEff = epcResponse['mainheatc-energy-eff'];
        this.mainheatcEnvEff = epcResponse['mainheatc-env-eff'];
        this.lightingDescription = epcResponse['lighting-description'];
        this.lightingEnergyEff = epcResponse['lighting-energy-eff'];
        this.lightingEnvEff = epcResponse['lighting-env-eff'];
        this.windTurbineCount = epcResponse['wind-turbine-count'];
        this.heatLossCorridor = epcResponse['heat-loss-corridoor'];
        this.unheatedCorridorLength = epcResponse['unheated-corridor-length'];
        this.floorHeight = epcResponse['floor-height'];
        this.photoSupply = epcResponse['photo-supply'];
        this.solarWaterHeatingFlag = epcResponse['solar-water-heating-flag'];
        this.mechanicalVentilation = epcResponse['mechanical-ventilation'];
        this.address = epcResponse['address'];
        this.constituencyLabel = epcResponse['constituency-label'];
    }

    public getDisplayAddress(): string {
        let displayAddress1 = this.address1;
        let displayAddress2 = this.address2 ? ', ' + this.address2 : '';
        let displayAddress3 = this.address3 ? ', ' + this.address3 : '';
        return displayAddress1 + displayAddress2 + displayAddress3;
    }

    public getHouseNumber(): number {
        const houseNumberFromFirstLine = Epc.getIntegerFromStartOfString(this.address1);
        const houseNumberFromSecondLine = Epc.getIntegerFromStartOfString(this.address2);
        return houseNumberFromFirstLine || houseNumberFromSecondLine;
    }

    private static getIntegerFromStartOfString(input: string): number {
        const matchNumberAtStartOfString = /^[0-9]+/;
        const regexMatches = matchNumberAtStartOfString.exec(input);
        const numberAsString = regexMatches && regexMatches.length > 0 && regexMatches[0];
        const number = numberAsString ? parseInt(numberAsString) : null;
        return (number && !isNaN(number)) ? number : null;
    }

    private static getParsedFloorLevel(val: string): number {
        return (val.toLowerCase() === 'ground') ? 0 : Epc.getParsedIntegerOrNull(val);
    }

    private static getParsedIntegerOrNull(val: string): number {
        const parsedNumber = parseInt(val);
        return isNaN(parsedNumber) ? null : parsedNumber;
    }

    private static getParsedBooleanFromEpcResponseValue(val: string): boolean {
        if (val === 'Y') {
            return true;
        } else if (val === 'N') {
            return false;
        } else {
            return null;
        }
    }
}
