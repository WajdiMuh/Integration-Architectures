import { EvaluationRecordAttributeSet } from './EvaluationRecordAttributeSet';
export interface EvaluationRecord{
    id: number;
    competence: EvaluationRecordAttributeSet;
    openness: EvaluationRecordAttributeSet;
    socialbehaviour: EvaluationRecordAttributeSet;
    attitude: EvaluationRecordAttributeSet;
    communication: EvaluationRecordAttributeSet;
    integrity: EvaluationRecordAttributeSet;
    year: number;
}