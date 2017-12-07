import {Epc} from "../../../shared/postcode-epc-service/model/epc";
import includes from "lodash-es/includes";

export enum ElectricityTariff {
    Standard,
    OffPeak,
}

export function getElectricityTariffDescription(electricityTariff: ElectricityTariff) {
    switch (electricityTariff) {
        case ElectricityTariff.Standard: {
            return 'standard';
        }
        case ElectricityTariff.OffPeak: {
            return 'off peak';
        }
        default: {
            return null;
        }
    }
}

export function getElectricityTariffFromEpc(epc: Epc): ElectricityTariff {
    if (epc.hotWaterDescription && includes(epc.hotWaterDescription, 'off-peak')) {
        return ElectricityTariff.OffPeak;
    } else if (epc.hotWaterDescription && includes(epc.hotWaterDescription, 'standard tariff')) {
        return ElectricityTariff.Standard;
    } else {
        return null;
    }
}