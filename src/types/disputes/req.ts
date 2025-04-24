import { DisputeEvidenceFile, DisputeEvidenceTextEntries } from "./disputes";

export interface AddDisputeEvidenceRequest {
    text?: DisputeEvidenceTextEntries | null | undefined;
    files?: DisputeEvidenceFile | null | undefined;
}

export interface DeleteDisputeEvidenceRequest {
    text: Array<string>
    files: Array<string>
}
