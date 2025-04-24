export type VerificationErrorCode = "InvalidDocument" | "InvalidField";

export interface VerificationError {
    code: VerificationErrorCode;
    id: string;
    description: string;
}
