export enum HomeAge {
    pre1900,
    from1900to1929,
    from1930to1949,
    from1950to1966,
    from1967to1975,
    from1976to1982,
    from1983to1990,
    from1991to1995,
    from1996to2002,
    from2003to2006,
    from2007to2011,
    from2011toPresent
}

export abstract class HomeAgeUtil {
    private static getInclusiveLowerBoundYear(homeAge: HomeAge) {
        switch (homeAge) {
            case HomeAge.pre1900:           { return null; }
            case HomeAge.from1900to1929:    { return 1900; }
            case HomeAge.from1930to1949:    { return 1930; }
            case HomeAge.from1950to1966:    { return 1950; }
            case HomeAge.from1967to1975:    { return 1967; }
            case HomeAge.from1976to1982:    { return 1976; }
            case HomeAge.from1983to1990:    { return 1983; }
            case HomeAge.from1991to1995:    { return 1991; }
            case HomeAge.from1996to2002:    { return 1996; }
            case HomeAge.from2003to2006:    { return 2003; }
            case HomeAge.from2007to2011:    { return 2007; }
            case HomeAge.from2011toPresent: { return 2011; }
        }
    }

    private static getInclusiveUpperBoundYear(homeAge: HomeAge) {
        if (homeAge === HomeAge.from2011toPresent) {
            return null;
        }
        let nextHomeAge = homeAge + 1;
        return HomeAgeUtil.getInclusiveLowerBoundYear(nextHomeAge) - 1;
    }

    public static getDisplayName(homeAge: HomeAge) {
        switch (homeAge) {
            case HomeAge.pre1900:
                const exclusiveUpperBoundYear = HomeAgeUtil.getInclusiveUpperBoundYear(HomeAge.pre1900) + 1;
                return `pre ${ exclusiveUpperBoundYear }`;
            case HomeAge.from2011toPresent:
                const inclusiveLowerBoundYear = HomeAgeUtil.getInclusiveLowerBoundYear(HomeAge.from2011toPresent);
                return `${ inclusiveLowerBoundYear }-present`;
            default:
                let lowerBoundYear = HomeAgeUtil.getInclusiveLowerBoundYear(homeAge);
                let upperBoundYear = HomeAgeUtil.getInclusiveUpperBoundYear(homeAge);
                return lowerBoundYear + '-' + upperBoundYear;
        }
    }
}
