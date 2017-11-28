import {AcfPageResponse} from "./acf-page-response";

export interface MeasureContent {
    acf: {
        rdsap_measure_code: string;
        headline: string;
        summary: string;
        featured_page: string;
        linked_pages: AcfPageResponse[];
        advantages: string;
    }
}