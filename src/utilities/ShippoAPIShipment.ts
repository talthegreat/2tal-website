// To parse this data:
//
//   import { Convert, ShippoAPIShipment } from "./file";
//
//   const shippoAPIShipment = Convert.toShippoAPIShipment(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ShippoAPIShipment {
    extra:           Extra;
    metadata:        string;
    shipmentDate:    string;
    addressFrom:     Address;
    addressReturn:   Address;
    addressTo:       Address;
    carrierAccounts: any[];
    messages:        Message[];
    objectCreated:   string;
    objectId:        string;
    objectUpdated:   string;
    parcels:         Parcel[];
    rates:           Rate[];
    status:          string;
    test:            boolean;
}

export interface Address {
    name:              string;
    company:           string;
    street1:           string;
    street2:           string;
    street3:           string;
    streetNo:          string;
    city:              string;
    state:             string;
    zip:               string;
    country:           string;
    phone:             string;
    email:             string;
    isComplete:        boolean;
    objectId:          string;
    validationResults: Extra;
    test:              boolean;
}

export interface Extra {
}

export interface Message {
    source: string;
    code:   string;
    text:   string;
}

export interface Parcel {
    extra:         Extra;
    metadata:      string;
    massUnit:      string;
    weight:        string;
    distanceUnit:  string;
    height:        string;
    length:        string;
    width:         string;
    objectCreated: string;
    objectId:      string;
    objectOwner:   string;
    objectState:   string;
    objectUpdated: string;
    test:          boolean;
}

export interface Rate {
    amount:           string;
    amountLocal:      string;
    currency:         string;
    currencyLocal:    string;
    attributes:       string[];
    carrierAccount:   string;
    durationTerms:    string;
    estimatedDays:    number;
    messages:         any[];
    objectCreated:    string;
    objectId:         string;
    objectOwner:      string;
    provider:         string;
    providerImage75:  string;
    providerImage200: string;
    servicelevel:     Servicelevel;
    shipment:         string;
    test:             boolean;
    zone:             string;
}

export interface Servicelevel {
    name:          string;
    terms:         string;
    token:         string;
    extendedToken: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toShippoAPIShipment(json: string): ShippoAPIShipment {
        return cast(JSON.parse(json), r("ShippoAPIShipment"));
    }

    public static shippoAPIShipmentToJson(value: ShippoAPIShipment): string {
        return JSON.stringify(uncast(value, r("ShippoAPIShipment")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

// function u(...typs: any[]) {
//     return { unionMembers: typs };
// }

function o(props: any[], additional: any) {
    return { props, additional };
}

// function m(additional: any) {
//     return { props: [], additional };
// }

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "ShippoAPIShipment": o([
        { json: "extra", js: "extra", typ: r("Extra") },
        { json: "metadata", js: "metadata", typ: "" },
        { json: "shipmentDate", js: "shipmentDate", typ: Date },
        { json: "addressFrom", js: "addressFrom", typ: r("Address") },
        { json: "addressReturn", js: "addressReturn", typ: r("Address") },
        { json: "addressTo", js: "addressTo", typ: r("Address") },
        { json: "carrierAccounts", js: "carrierAccounts", typ: a("any") },
        { json: "messages", js: "messages", typ: a(r("Message")) },
        { json: "objectCreated", js: "objectCreated", typ: Date },
        { json: "objectId", js: "objectId", typ: "" },
        { json: "objectUpdated", js: "objectUpdated", typ: Date },
        { json: "parcels", js: "parcels", typ: a(r("Parcel")) },
        { json: "rates", js: "rates", typ: a(r("Rate")) },
        { json: "status", js: "status", typ: "" },
        { json: "test", js: "test", typ: true },
    ], false),
    "Address": o([
        { json: "name", js: "name", typ: "" },
        { json: "company", js: "company", typ: "" },
        { json: "street1", js: "street1", typ: "" },
        { json: "street2", js: "street2", typ: "" },
        { json: "street3", js: "street3", typ: "" },
        { json: "streetNo", js: "streetNo", typ: "" },
        { json: "city", js: "city", typ: "" },
        { json: "state", js: "state", typ: "" },
        { json: "zip", js: "zip", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "phone", js: "phone", typ: "" },
        { json: "email", js: "email", typ: "" },
        { json: "isComplete", js: "isComplete", typ: true },
        { json: "objectId", js: "objectId", typ: "" },
        { json: "validationResults", js: "validationResults", typ: r("Extra") },
        { json: "test", js: "test", typ: true },
    ], false),
    "Extra": o([
    ], false),
    "Message": o([
        { json: "source", js: "source", typ: "" },
        { json: "code", js: "code", typ: "" },
        { json: "text", js: "text", typ: "" },
    ], false),
    "Parcel": o([
        { json: "extra", js: "extra", typ: r("Extra") },
        { json: "metadata", js: "metadata", typ: "" },
        { json: "massUnit", js: "massUnit", typ: "" },
        { json: "weight", js: "weight", typ: "" },
        { json: "distanceUnit", js: "distanceUnit", typ: "" },
        { json: "height", js: "height", typ: "" },
        { json: "length", js: "length", typ: "" },
        { json: "width", js: "width", typ: "" },
        { json: "objectCreated", js: "objectCreated", typ: Date },
        { json: "objectId", js: "objectId", typ: "" },
        { json: "objectOwner", js: "objectOwner", typ: "" },
        { json: "objectState", js: "objectState", typ: "" },
        { json: "objectUpdated", js: "objectUpdated", typ: Date },
        { json: "test", js: "test", typ: true },
    ], false),
    "Rate": o([
        { json: "amount", js: "amount", typ: "" },
        { json: "amountLocal", js: "amountLocal", typ: "" },
        { json: "currency", js: "currency", typ: "" },
        { json: "currencyLocal", js: "currencyLocal", typ: "" },
        { json: "attributes", js: "attributes", typ: a("") },
        { json: "carrierAccount", js: "carrierAccount", typ: "" },
        { json: "durationTerms", js: "durationTerms", typ: "" },
        { json: "estimatedDays", js: "estimatedDays", typ: 0 },
        { json: "messages", js: "messages", typ: a("any") },
        { json: "objectCreated", js: "objectCreated", typ: Date },
        { json: "objectId", js: "objectId", typ: "" },
        { json: "objectOwner", js: "objectOwner", typ: "" },
        { json: "provider", js: "provider", typ: "" },
        { json: "providerImage75", js: "providerImage75", typ: "" },
        { json: "providerImage200", js: "providerImage200", typ: "" },
        { json: "servicelevel", js: "servicelevel", typ: r("Servicelevel") },
        { json: "shipment", js: "shipment", typ: "" },
        { json: "test", js: "test", typ: true },
        { json: "zone", js: "zone", typ: "" },
    ], false),
    "Servicelevel": o([
        { json: "name", js: "name", typ: "" },
        { json: "terms", js: "terms", typ: "" },
        { json: "token", js: "token", typ: "" },
        { json: "extendedToken", js: "extendedToken", typ: "" },
    ], false),
};
