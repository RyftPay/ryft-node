import { Address } from "./address";

export interface ShippingDetails {
    address: Address;
    phoneNumber?: string | null | undefined;
}
